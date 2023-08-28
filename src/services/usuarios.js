import db from '../config/mongodb.js';
import { ObjectId } from 'mongodb';
import { traerUserLogin } from "../utils/globalFunciones.js"
const usuarios = db.getInstance().changeCollection('usuarios').connect()

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
    static async getUsuarios(res) {
        let consulta = await usuarios.find({}).toArray()
        res.status(200).json(consulta)
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
}