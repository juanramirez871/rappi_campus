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

router.get('/info', versiones({ "1.0.0": Usuarios.getUsuariosById, "1.0.1": Usuarios.getUsuarios, "1.0.5": validate(Usuarios.getUsuarioBusqueda)}));

router.get('/obtener/pedidos', versiones({ "^1.0.0": validate(Usuarios.getPedidosByUsuarioId) }));

router.post('/agregar/pedidos', versiones({ "^1.0.0": validate(Usuarios.postUsuarioPedido) }));

router.delete('/eliminar/pedidos/:id', versiones({ "^1.0.0": validate(Usuarios.deleteUsuarioPedido) }));

router.put('/actualizar/estado/pedido/:id/:estado', versiones({ "^1.0.0": validate(Usuarios.updateEstadoPedido) }));

router.get('/obtener/recibo/:id',versiones({ "^1.0.0": validate(Usuarios.getReciboPedido) }));

router.get('/domiciliario/:id/pedidos',versiones({ "^1.0.0": validate(Usuarios.countorders) }));

router.get("/obtener", validate(Locales.getLocal))

router.get('/categorias/locales', versiones({ "1.0.0": validate(Locales.getLocalesByCategory) }));

router.post('/agregar/local', versiones({ "1.0.0": validate(Locales.postLocal) }));

router.get('/horarios/:id', versiones({ "1.0.1": validate(Locales.getHorario) }));

router.get('/obtener/local/departamento/:departamento',versiones({ "1.0.0": validate(Locales.getLocalesDepartamento) }));

router.get('/obtener/local/barrio/:barrio',versiones({ "1.0.0": validate(Locales.getLocalesBarrio) }));

export { router };