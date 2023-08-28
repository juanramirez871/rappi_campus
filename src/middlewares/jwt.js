import db from "../config/mongodb.js";
import { jwtVerify, SignJWT } from "jose";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config("../");

const usuario = await db.getInstance().changeCollection('usuarios').connect();
const createToken = async(req,res,next)=>{
    if (Object.keys(req.body).length === 0) return res.status(400).send({status: 400, message: "datos no enviados"});
    const encoder = new TextEncoder();
    try {
        console.log(req.body);
        const result = await usuario.findOne({ email: req.body.correo, password: req.body.contraseña});
    } catch (error) {
        return res.status(404).send("Usuario no encontrado")
    }
    const result = await usuario.findOne({ email: req.body.correo, password: req.body.contraseña});
    if(!result) return res.status(401).send({status: 401,message: "Usuario no encontrado"});
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_SECRET));
    req.data = {status: 200,message: jwtConstructor};
    next();
}
const validarToken = async (req, token)=>{
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        let baseQuitada = req.baseUrl.slice(4);
        let res = await usuario.findOne({
            _id: new ObjectId(jwtData.payload.id),
            [`permisos.${baseQuitada}`]: `${req.headers["accept-version"]}`
        });
        return res;
    } catch (error) {
        return false;
    }
}

export {
    createToken,
    validarToken
}