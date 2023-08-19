import { Router } from "express";
import Cupones from "../services/cupones.js"
const router = Router()

router.post('/', Cupones.postCupon)


export { router };