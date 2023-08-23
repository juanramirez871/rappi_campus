import db from '../config/mongodb.js';
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
const usuarios = db.getInstance().changeCollection('usuarios').connect()

export default class Usuarios {
    static async postUsuarios(req, res) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
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
        let consultaUsuarios = await usuarios.find({ _id: new ObjectId(req.params.id) }).toArray()
        let consultaPedidos = await pedidos.find({ usuarioId: new ObjectId(req.params.id) }).toArray()
        const result = {
            usuario: consultaUsuarios,
            pedidos: consultaPedidos
        };
        res.status(200).json(result)
    }
}