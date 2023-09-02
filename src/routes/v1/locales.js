import { Router } from "express";
import Locales from "../../services/locales.js"
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';
import passportHelper from "../../config/passportHelpert.js";

const router = Router()
const versiones = routesVersioning()

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/info', versiones({ "^1.0.0": validate(Locales.getLocalById)}));

router.get('/obtener', versiones({ "^1.0.0": validate(Locales.getLocal) }));

router.get('/obtener/Local', versiones({ "^1.0.0": validate(Locales.getLocalById) }));

router.get('/categorias', versiones({ "^1.0.0": validate(Locales.getLocalesByCategory) }));

router.post('/agregar', versiones({ "^1.0.0": validate(Locales.postLocal) }));

router.post('/:id/producto', versiones({ "^1.0.0": validate(Locales.postProductoLocal) }));

router.put('/actualizar', versiones({ "^1.0.0": validate(Locales.putLocal) }));

router.delete('/eliminar', versiones({ "^1.0.0": validate(Locales.deleteLocal) }));

router.get('/horarios/:id', versiones({ "^1.0.0": validate(Locales.getHorario) }));

router.get('/obtener/local/departamento/:departamento',versiones({ "^1.0.0": validate(Locales.getLocalesDepartamento) }));

router.get('/obtener/local/barrio/:barrio',versiones({ "^1.0.0": validate(Locales.getLocalesBarrio) }));

export { router };