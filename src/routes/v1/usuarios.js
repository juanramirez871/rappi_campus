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

router.get('/info', versiones({ "1.0.0": Usuarios.getUsuariosById, "1.0.1": Usuarios.getUsuarios}));

router.get('/obtener/pedidos', versiones({ "^1.0.0": validate(Usuarios.getPedidosByUsuarioId) }));

router.post('/agregar/pedidos', versiones({ "^1.0.0": validate(Usuarios.postUsuarioPedido) }));

router.delete('/eliminar/pedidos/:id/:usuarioId', versiones({ "^1.0.0": validate(Usuarios.deleteUsuarioPedido) }));

router.put('/actualizar/estado/pedido/:id/:usuarioId/:estado', versiones({ "^1.0.0": validate(Usuarios.updateEstadoPedido) }));

router.get('/obtener/recibo/:id/:usuarioId',versiones({ "^1.0.0": validate(Usuarios.getReciboPedido) }));

router.get('/domiciliario/:id/pedidos',versiones({ "^1.0.0": validate(Usuarios.countorders) }));

export { router };