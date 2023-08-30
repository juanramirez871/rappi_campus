import { Router } from "express";
import routesVersioning from "express-routes-versioning";
import { validate } from "../../validations/validateService.js";
import Usuarios from "../../services/usuarios.js";

const router = Router();
const versiones = routesVersioning();

router.post("/", versiones({"^1.0.0": validate(Usuarios.postUsuarios)}));

export {router}