import { Router } from "express";
import Usuarios from "../../services/usuarios.js";
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';
import passportHelper from "../../config/passportHelpert.js";

const router = Router()
const versiones = routesVersioning()

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/obtener', versiones({ "^1.0.1": validate(Usuarios.getUsuarios) }));

router.put('/actualizar/:id', versiones({ "^1.0.0": validate(Usuarios.putUsuarios) }));

router.delete('/eliminar/:id', versiones({ "^1.0.0": validate(Usuarios.deleteUsuarios) }));

router.get('/obtener/:id', versiones({ "^1.0.2": validate(Usuarios.getUsuariosById) }));

router.get('/obtener/pedidos/:id', versiones({ "^1.0.0": validate(Usuarios.getPedidosByUsuarioId) }));

export { router };