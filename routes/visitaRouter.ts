import { Router } from "express";
import { agregarEstatusVisita, confirmarVisita, getFotoSolicitante, getVisitasPendientes } from "../controller/visitasController";
import { validarArchivo } from "../middlewares/validarArchivo";
import validarJWT from "../middlewares/validarToken";
import validarCampos from "../middlewares/ValidarErrores";
import { body } from "express-validator";

const visitaRouter = Router();

visitaRouter.post("/visitasPendientes",[
    validarJWT,
    body('id').notEmpty()
],getVisitasPendientes);

visitaRouter.put("/actualizarEstatus",[
    validarJWT,
    body('id').notEmpty
],agregarEstatusVisita);

visitaRouter.put("/confirmarVisita", [
    validarJWT,
    body('id').notEmpty()
],confirmarVisita);

visitaRouter.post("/fotoSolicitante",[
    validarJWT,
    body('id').notEmpty()
],getFotoSolicitante);

export default visitaRouter;