import db from '../config/mongodb.js';
const locales = db.getInstance().changeCollection('locales').connect()

export default class Locales {
    static async postLocal(req, res) {
        await locales.find();
        res.send(":3")
    }
}