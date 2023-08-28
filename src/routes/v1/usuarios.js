import { Router } from "express";
import Usuarios from "../../services/usuarios.js";
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';
import passportHelper from "../../config/passportHelpert.js";
import Locales from "../../services/locales.js"

const router = Router()
const versiones = routesVersioning()

router.use(passportHelper.authenticate('bearer', {session: false}));

router.post('/agregar/local', versiones({"1.0.0": validate(Locales.postLocal)}));

router.put('/actualizar', versiones({ "1.0.0": validate(Usuarios.putUsuarios) }));

router.delete('/eliminar', versiones({ "1.0.0": validate(Usuarios.deleteUsuarios) }));

router.get('/perfil', versiones({ "1.0.0": validate(Usuarios.getUsuariosById) }));

router.get('/obtener/pedidos', versiones({ "1.0.0": validate(Usuarios.getPedidosByUsuarioId) }));

export { router };