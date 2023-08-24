import { Router } from "express";
import Productos from "../../services/productos.js"
import routesVersioning  from 'express-routes-versioning';
import { validate } from "../../validations/validateService.js";

const router = Router()
const versiones = routesVersioning()

router.get('/categorias', versiones({ "^1.0.0": validate(Productos.getCategorias) }));

export { router };