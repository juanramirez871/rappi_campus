import { Router } from "express";
import Locales from "../services/locales.js"
const router = Router()

router.post('/agregar', Locales.postLocal)

router.get('/obtener', Locales.getLocal)

router.put('/actualizar/:id', Locales.putLocal)

router.delete('/eliminar/:id', Locales.deleteLocal)

router.get('/obtener/:id', Locales.getLocalById)

export { router };