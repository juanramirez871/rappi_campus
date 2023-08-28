import { validarToken } from "../middlewares/jwt.js";

export async function traerUserLogin(req){
    let tokenUser = req.headers['authorization'].slice(7);
    let user = await validarToken(req,tokenUser);
    return user;
}