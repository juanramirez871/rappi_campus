import db from '../config/mongodb.js';
import { ObjectId } from 'mongodb';
import { traerUserLogin } from "../utils/globalFunciones.js"
import { quitarId } from "../utils/globalFunciones.js"
const usuarios = db.getInstance().changeCollection('usuarios').connect()
const Pedido = db.getInstance().changeCollection('pedidos').connect()
const locales = db.getInstance().changeCollection('locales').connect()

export default class Usuarios {
    static async postUsuarios(req, res) {
        req.body.activo = 1;
        req.body.role = 0;
        req.body.permisos = {
            "/usuarios": ["1.0.0"]
        }
        await usuarios.insertOne(req.body);
        res.status(200).send({status: 200, message: "Usuario registrado con exito"});
    }
    static async getUsuarios(req,res) {
        let user = await traerUserLogin(req);
        const consulta = await usuarios.find({role: {$lt:user.role}}).toArray();
        const data = quitarId(consulta);
        res.status(200).send(data)
    }
    static async putUsuarios(req, res) {
        if((req.body.role)||(req.body.permisos)||(req.body.activo)) return res.status(400).send("No es valido el dato enviado, no se puede cambiar");
        let user = await traerUserLogin(req);
        await usuarios.updateOne({ _id: new ObjectId(user._id.toString()) }, { $set: req.body })
        res.status(200).send({status: 200, message: "Usuario actualizado con exito"})
    }
    static async deleteUsuarios(req, res) {
        let user = await traerUserLogin(req);
        if(req.body.confirmacion == "confirmar"){
            await usuarios.updateOne({ _id: new ObjectId(user._id.toString()) }, { $set: { activo: 0 } })
            await locales.updateOne({ adminId: user._id.toString(), activo: 1 }, { $set: { activo: 0 } });
            return res.status(200).send({status: 200, message: "Usuario eliminado con exito"});
        }else{
            return res.status(400).send({status: 400, message: "Para eliminar la cuenta necesita colocar confirmacion: confirmar"})
        }
    }
    static async getUsuariosById(req, res) {
        let user = await traerUserLogin(req);
        let {_id,activo,role,permisos, ...data} = user;
        res.status(200).send({status: 200,message: data})
    }

    static async getUsuarioBusqueda(req, res) {
        if(req.body.id && !req.body.email) return res.status(400).send({status:400,message:"Para buscar, coloque en el body cualquiera de estas(email: emailDelUsuario || id: idDelUsuario"})
        const consulta = await usuarios.findOne({$or:[{_id: new ObjectId(req.body.id)},{email: req.body.email}]})
        let {password, ...data} = consulta
        res.status(200).send({ status: 200, message: data})
    }

    static async getPedidosByUsuarioId(req, res) {
        const pedidos = db.getInstance().changeCollection('pedidos').connect();
        const locales = db.getInstance().changeCollection('locales').connect();
        let user = await traerUserLogin(req);
        let consultaPedidos = await pedidos.find({ usuarioId: user._id.toString() }).toArray();
        let consultaLocales = await locales.aggregate([
            {
                $match: { _id: new ObjectId(consultaPedidos[0].localId) },
                
            },
            { $unwind: "$productos" },
            { $project: { productos: 1 } }

        ]).toArray()

        const productos = consultaPedidos[0].productos.map(el => {

            return consultaLocales.filter(locales => {

                return el.includes(locales.productos._id)
            })
        })

        res.status(200).json({ productos, pedido: consultaPedidos });
    }
    static async postUsuarioPedido(req, res){
        const pedidos = db.getInstance().changeCollection('pedidos').connect();
        let user = await traerUserLogin(req)
        req.body.usuarioId = user._id.toString()
        let consulta = await pedidos.insertOne(req.body)
        res.status(200).json(consulta)
    }
    static async deleteUsuarioPedido(req, res) {
        const pedidos = db.getInstance().changeCollection('pedidos').connect();
        try {
            const consulta = await pedidos.updateOne({_id: new ObjectId(req.params.id),usuarioId: req.params.usuarioId},{$set: { activo: 0 }});
            if (consulta.matchedCount === 1) {
                res.status(200).json({ msg: "Pedido desactivado exitosamente" });
            } else {
                res.status(404).json({ msg: "Pedido no encontrado o no pertenece al usuario" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error en el servidor" });
        }
    }
    static async updateEstadoPedido(req, res) {
        const pedidos = db.getInstance().changeCollection('pedidos').connect();
        try {
            const consulta = await pedidos.updateOne({_id: new ObjectId(req.params.id),usuarioId: req.params.usuarioId},{$set: { estado: parseInt(req.params.estado) }});
            if (consulta.matchedCount === 1) {
                res.status(200).json({ msg: "Pedido cambio de estado exitosamente" });
            } else {
                res.status(404).json({ msg: "Pedido no encontrado o no pertenece al usuario" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error en el servidor" });
        }
    }
    static async getReciboPedido(req, res) {
        const pedidos = db.getInstance().changeCollection('pedidos').connect();
        const consulta = await pedidos.findOne({_id: new ObjectId(req.params.id),usuarioId: req.params.usuarioId});
        if (consulta.descuentoTotal != 0) {
            consulta.constoConDescuento = consulta.costoTotal-((consulta.costoTotal*consulta.descuentoTotal)/100)
            res.status(200).json(consulta);
        }else{
            consulta.constoConDescuento = consulta.costoTotal
            res.status(200).json(consulta);
        }
        
    }
    static async countorders(req, res){

        const data = await Pedido.find({ domiciliarioId: req.params.id }).count()
        res.json({ msg: "domiciliario ha hecho estos domicilios", domicilios: data })
    }
}