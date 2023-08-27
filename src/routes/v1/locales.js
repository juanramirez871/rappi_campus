import { Router } from "express";
import Locales from "../../services/locales.js"
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';

const router = Router()
const versiones = routesVersioning()

router.get('/obtener', versiones({ "^1.0.0": validate(Locales.getLocal) }));

router.get('/obtener/:id', versiones({ "^1.0.0": validate(Locales.getLocalById) }));

router.get('/categorias', versiones({ "^1.0.0": validate(Locales.getLocalesByCategory) }));

router.post('/agregar', versiones({ "^1.0.0": validate(Locales.postLocal) }));

router.post('/:id/producto', versiones({ "^1.0.0": validate(Locales.postProductoLocal) }));

router.post('/:id/producto', versiones({ "^1.0.0": validate(Locales.postProductoLocal) }));

router.put('/actualizar/:id', versiones({ "^1.0.0": validate(Locales.putLocal) }));

router.delete('/eliminar/:id', versiones({ "^1.0.0": validate(Locales.deleteLocal) }));

router.get('/horarios/:id', versiones({ "^1.0.0": validate(Locales.getHorario) }));





export { router };