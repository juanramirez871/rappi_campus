import { Router } from "express";
import Usuarios from "../services/usuarios.js";
const router = Router()

router.post('/post', Usuarios.postUsuarios)

router.get('/get', Usuarios.getUsuarios)

router.put('/put/:id', Usuarios.putUsuarios)

router.delete('/delete/:id', Usuarios.deleteUsuarios)

export { router };