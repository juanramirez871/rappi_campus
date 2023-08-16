import db from '../config/mongodb.js';
const usuarios = db.getInstance().changeCollection('usuarios').connect()

export default class Usuarios {
    static async postUsuarios(req, res) {
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
    
}