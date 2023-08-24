import { Router } from "express";
import Usuarios from "../../services/usuarios.js";
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';

const router = Router()
const versiones = routesVersioning()

router.post('/agregar', versiones({ "^1.0.0": validate(Usuarios.postUsuarios) }));

router.get('/obtener', versiones({ "^1.0.0": validate(Usuarios.getUsuarios) }));

router.put('/actualizar/:id', versiones({ "^1.0.0": validate(Usuarios.putUsuarios) }));

router.delete('/eliminar/:id', versiones({ "^1.0.0": validate(Usuarios.deleteUsuarios) }));

router.get('/obtener/:id', versiones({ "^1.0.0": validate(Usuarios.getUsuariosById) }));

router.get('/obtener/pedidos/:id', versiones({ "^1.0.0": validate(Usuarios.getPedidosByUsuarioId) }));

export { router };