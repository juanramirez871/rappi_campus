import { Router } from "express";
import Locales from "../../services/locales.js"
import { validate } from "../../validations/validateService.js";

const router = Router()

router.post('/agregar', validate(Locales.postLocal))

router.get('/obtener', validate(Locales.getLocal))

router.put('/actualizar/:id', validate(Locales.putLocal))

router.delete('/eliminar/:id', validate(Locales.deleteLocal))

router.get('/obtener/:id', validate(Locales.getLocalById))

router.post('/:id/producto', validate(Locales.postProductoLocal))

router.get('/categorias', validate(Locales.getLocalesByCategory))

export { router };