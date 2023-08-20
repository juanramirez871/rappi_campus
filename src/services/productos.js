import { ObjectId } from 'mongodb';
import db from '../config/mongodb.js';
const locales = db.getInstance().changeCollection('locales').connect()

export default class Productos {

    static async getCategorias(req, res) {

        if(req.body?.categorias?.[0]) {
        const consulta = await locales.aggregate([
            {
                $match: {
                    "productos.categorias": { $in: req.body.categorias }
                }
            },
            { $project: { productos: 1 } },
            { $unwind: "$productos" }
        ]).toArray()

        const includeRange = (array,arraySearch) => {
            return array.find(el => arraySearch.includes(el))
        }

        const data = consulta.map(el => {
            if(!el.productos.categorias) return;
            if(includeRange(el.productos.categorias, req.body.categorias)) return el.productos
        })

        res.status(200).json({ data: data.filter(el => el != null), msg: "consulta exitosa"})
    }
    else res.status(400).json({ status: 400, msg: "categorias es requerido y de tipo array"});
}
}