import { Router } from "express";
import Productos from "../services/productos.js"
import { validate } from "../validations/validateService.js";
const router = Router()

router.get('/categorias', validate(Productos.getCategorias))

export { router };