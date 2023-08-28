import { Router } from "express";
import Locales from "../../services/locales.js"
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';
import passportHelper from "../../config/passportHelpert.js";

const router = Router()
const versiones = routesVersioning()

router.use(passportHelper.authenticate('bearer', {session: false}));

router.get('/obtener', versiones({ "1.0.0": validate(Locales.getLocal),"1.0.1": validate(Locales.getLocal) }));

router.get('/obtener/:id', versiones({ "^1.0.0": validate(Locales.getLocalById) }));

router.get('/categorias', versiones({ "^1.0.0": validate(Locales.getLocalesByCategory) }));

router.post('/:id/producto', versiones({ "^1.0.0": validate(Locales.postProductoLocal) }));

router.post('/:id/producto', versiones({ "^1.0.0": validate(Locales.postProductoLocal) }));

router.put('/actualizar/:id', versiones({ "^1.0.0": validate(Locales.putLocal) }));

router.delete('/eliminar/:id', versiones({ "^1.0.0": validate(Locales.deleteLocal) }));





export { router };