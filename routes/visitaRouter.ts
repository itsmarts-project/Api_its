import { Router } from "express";
import { agregarEstatusVisita, confirmarVisita, getFotoSolicitante, getVisitasPendientes } from "../controller/visitasController";
import { validarArchivo } from "../middlewares/validarArchivo";

const visitaRouter = Router();

visitaRouter.get("/visitasPendientes", getVisitasPendientes);
visitaRouter.post("/actualizarEstatus", agregarEstatusVisita);
visitaRouter.post("/confirmarVisita", [],confirmarVisita);
visitaRouter.get("/fotoSolicitante", getFotoSolicitante);

export default visitaRouter;