import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const locales = db.getInstance().changeCollection('locales').connect()

export default class Locales {

    static async postLocal(req, res) {
        const consulta = await locales.insertOne(req.body)
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async getLocal(req, res) {
        const consulta = await locales.find({}).toArray()
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async putLocal(req, res) {
        const consulta = await locales.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async deleteLocal(req, res) {
        const consulta = await locales.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { activo: 0 } })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async getLocalById(req, res) {
        const consulta = await locales.findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async postProductoLocal(req, res){

        const consulta = await locales.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { productos: req.body } })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }
}