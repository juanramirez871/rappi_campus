import { Router } from "express";
import Usuarios from "../services/usuarios.js";
import { validate } from "../middlewares/validations/validateService.js";
const router = Router()

router.post('/', validate(Usuarios.postUsuarios))

router.get('/', validate(Usuarios.getUsuarios))

router.put('/:id', validate(Usuarios.putUsuarios))

router.delete('/:id', validate(Usuarios.deleteUsuarios))

router.get('/:id', validate(Usuarios.getUsuariosById))

export { router };