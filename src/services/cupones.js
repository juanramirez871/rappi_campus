import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const cupones = db.getInstance().changeCollection('cupones').connect()

export default class Cupones {
    static async postCupon(req, res) {
    }
}