import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const cupones = db.getInstance().changeCollection('cupones').connect()

export default class Cupones {

    static async postCupones(req, res) {
        await cupones.insertOne(req.body);
        res.status(201).json({ status: 201, msg: "Cupon insertado correctamente" })
    }
}