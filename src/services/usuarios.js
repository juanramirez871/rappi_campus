import db from '../config/mongodb.js';
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
const usuarios = db.getInstance().changeCollection('usuarios').connect()

export default class Usuarios {
    static async postUsuarios(req, res) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        req.body.activo = 1
        let consulta = await usuarios.insertOne(req.body)
        res.status(200).json(consulta)
    }
    static async getUsuarios(req, res) {
        let consulta = await usuarios.find({}).toArray()
        res.status(200).json(consulta)
    }
    static async putUsuarios(req, res) {
        let consulta = await usuarios.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        res.status(200).json(consulta)
    }
    static async deleteUsuarios(req, res) {
        let consulta = await usuarios.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { activo: 0 } })
        res.status(200).json(consulta)
    }
    static async getUsuariosById(req, res) {
        let consulta = await usuarios.findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).json(consulta)
    }
    static async getPedidosByUsuarioId(req, res) {
        const pedidos = db.getInstance().changeCollection('pedidos').connect();

        const locales = db.getInstance().changeCollection('locales').connect();
        let consultaPedidos = await pedidos.find({ usuarioId: req.params.id }).toArray();
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