import { Router } from "express";
import Usuarios from "../../services/usuarios.js";
import { validate } from "../../validations/validateService.js";
const router = Router()

router.post('/agregar', validate(Usuarios.postUsuarios))

router.get('/obtener', validate(Usuarios.getUsuarios))

router.put('/actualizar/:id', validate(Usuarios.putUsuarios))

router.delete('/eliminar/:id', validate(Usuarios.deleteUsuarios))

router.get('/obtener/:id', validate(Usuarios.getUsuariosById))

router.get('/obtener/pedidos/:id/', validate(Usuarios.getPedidosByUsuarioId));

export { router };