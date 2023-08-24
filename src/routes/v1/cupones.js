import { Router } from "express";
import Cupones from "../../services/cupones.js";
import { validate } from "../../validations/validateService.js";
import routesVersioning  from 'express-routes-versioning';

const router = Router()
const versiones = routesVersioning()

router.post('/', versiones({ "^1.0.0": validate(Cupones.postCupones) }));


export { router };