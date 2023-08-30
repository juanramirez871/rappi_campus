import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const locales = db.getInstance().changeCollection('locales').connect()

export default class Locales {

    static async postLocal(req, res) {
        const consulta = await locales.insertOne(req.body)
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async getLocal(req, res, next) {
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
        let {id} = req.params;
        if(!id){
            res.status(404).send({status:404,message: "Hace falta poner el id_local para buscar por id"})
        }
        const consulta = await locales.findOne({ _id: new ObjectId(id) })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async postProductoLocal(req, res){
        req.body._id = new ObjectId();
        const consulta = await locales.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { productos: req.body } })
        res.status(200).json({ data: consulta, msg: "consulta exitosa"})
    }

    static async getLocalesByCategory(req, res){

        if(!req.body?.categorias?.[0]) res.status(400).json({ status: 400, msg: "categorias es requerido y de tipo array"});
        else {
            const consulta = await locales.find({ categorias: { $in: req.body.categorias } }).toArray();
            res.status(200).json({ data: consulta, msg: "consulta exitosa"})
        }
    }

    static async getHorario(req, res){

        const data = await locales.find({ _id: new ObjectId(req.params.id) }).project({ horario: 1 }).toArray()

        res.json(data)
    }

    static async getLocalesDepartamento(req, res){
        const data = await locales.find({ "direccion.departamento": req.params.departamento }).toArray()
        res.json(data)
    }
    static async getLocalesBarrio(req, res){
        const data = await locales.find({ "direccion.barrio": req.params.barrio }).toArray()
        res.json(data)
    }
}