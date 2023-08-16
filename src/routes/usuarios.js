import { Router } from "express";
import Usuarios from "../services/usuarios.js";
const router = Router()

router.post('/agregar', Usuarios.postLocal)



export { router };