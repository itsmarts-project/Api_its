import { Router } from "express";
import { agregarEstatusVisita, confirmarVisita, getFotoSolicitante, getVisitasPendientes } from "../controller/visitasController";
import { validarArchivo } from "../middlewares/validarArchivo";
import validarJWT from "../middlewares/validarToken";

const visitaRouter = Router();

visitaRouter.post("/visitasPendientes", getVisitasPendientes);
visitaRouter.put("/actualizarEstatus", agregarEstatusVisita);
visitaRouter.put("/confirmarVisita", confirmarVisita);
visitaRouter.post("/fotoSolicitante", getFotoSolicitante);

export default visitaRouter;