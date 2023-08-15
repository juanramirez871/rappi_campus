import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const locales = db.getInstance().changeCollection('locales').connect()

export default class Locales {
    static async postLocal(req, res) {
        let consulta = await locales.insertOne(req.body)
        res.status(200).json(consulta)
    }
    static async getLocal(req, res) {
        let consulta = await locales.find({}).toArray()
        res.status(200).json(consulta)
    }
    static async putLocal(req, res) {
        let consulta = await locales.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        res.status(200).json(consulta)
    }
    static async deleteLocal(req, res) {
        let consulta = await locales.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { activo: 0 } })
        res.status(200).json(consulta)
    }
    static async getLocalById(req, res) {
        let consulta = await locales.findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).json(consulta)
    }
}