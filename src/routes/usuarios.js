import { Router } from "express";
import Usuarios from "../services/usuarios.js";
const router = Router()

router.post('/', Usuarios.postUsuarios)

router.get('/', Usuarios.getUsuarios)

router.put('/:id', Usuarios.putUsuarios)

router.delete('/:id', Usuarios.deleteUsuarios)

router.get('/:id', Usuarios.getUsuariosById)

export { router };