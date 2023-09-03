import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
import { traerUserLogin } from "../utils/globalFunciones.js"
const locales = db.getInstance().changeCollection('locales').connect()
const usuario1 = db.getInstance().changeCollection('usuarios').connect()

export default class Locales {

    static async postLocal(req, res) {
        let user = await traerUserLogin(req);
        if(user.role == 1) return res.status(400).send({status:400,message:"Ya tienes un local registrado a tu nombre."})
        req.body.adminId = user._id.toString()
        await locales.insertOne(req.body)
        await usuario1.updateOne({_id: new ObjectId(user._id.toString())}, {$set: {role: 1, permisos: {"/usuarios": ["1.0.0"],"/locales": ["1.0.0"]}}})
        res.status(200).send({ status: 200, message: "consulta exitosa"})
    }

    static async getLocal(res) {
        await locales.find({}).toArray();
        res.status(200).send({ status: 200, message: "consulta exitosa"})
    }

    static async putLocal(req, res) {
        let user = await traerUserLogin(req)
        await locales.updateOne({ adminId: user._id.toString() }, { $set: req.body })
        res.status(200).send({ status: 200, message: "consulta exitosa"})
    }

    static async deleteLocal(req, res) {
        let user = await traerUserLogin(req);
        if(req.body.confirmacion == "confirmar"){
            await locales.updateOne({ adminId: user._id.toString(), activo: 1 }, { $set: { activo: 0 } });
            await usuario1.updateOne( {_id: new ObjectId(user._id.toString())}, { $set: {role: 0, permisos: {"/usuarios": ["1.0.0"]}} } )
            return res.status(200).send({status: 200, message: "Local eliminado con exito"});
        }else{
            return res.status(400).send({status: 400, message: "Para eliminar la cuenta necesita colocar confirmacion: confirmar"})
        }
    }

    static async getLocalById(req, res) {
        let user = await traerUserLogin(req);
        const consulta = await locales.findOne({ adminId: user._id.toString() })
        console.log(consulta);
        let {_id,adminId,activo, ...data} = consulta
        res.status(200).send({ status: 200, message: data})
    }

    static async postProductoLocal(req, res){
        let user = await traerUserLogin(req);
        req.body._id = new ObjectId();
        await locales.updateOne({ adminId: user._id.toString() }, { $push: { productos: req.body}})
        res.status(200).send({ status: 200, message: "consulta exitosa"})
    }

    static async getLocalesByCategory(req, res){

        if(!req.body?.categorias?.[0]) res.status(400).send({ status: 400, message: "categorias es requerido y de tipo array"});
        else {
            const consulta = await locales.find({ categorias: { $in: req.body.categorias } }).toArray();
            res.status(200).send({ status: 200, message: "consulta exitosa"})
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