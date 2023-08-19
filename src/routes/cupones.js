import { Router } from "express";
import Cupones from "../services/cupones.js";
import { validate } from "../middlewares/validations/validateService.js";
const router = Router()

router.post('/', validate(Cupones.postCupones))


export { router };