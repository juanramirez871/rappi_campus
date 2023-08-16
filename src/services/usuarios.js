const usuarios = db.getInstance().changeCollection('usuarios').connect()

export default class Usuarios {
    static async postUsuarios(req, res) {
        let consulta = await usuarios.insertOne(req.body)
        res.status(200).json(consulta)
    }
}