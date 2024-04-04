import { Router } from "express";
import { guardarSolicitante } from "../controller/solicitanteController";
import validarJWT from "../middlewares/validarToken";
import { validarCorreoSolicitante } from "../middlewares/validarEmail";

const solicitanteRouter = Router();

solicitanteRouter.post("/registrar", [
    validarJWT,
    validarCorreoSolicitante
],guardarSolicitante);

export default solicitanteRouter;