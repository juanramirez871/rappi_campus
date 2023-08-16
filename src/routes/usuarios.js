import { Router } from "express";
import Usuarios from "../services/usuarios.js";
const router = Router()

router.post('/post', Usuarios.postUsuarios)

router.get('/get', Usuarios.getUsuarios)


export { router };