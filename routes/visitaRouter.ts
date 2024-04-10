import { Router } from "express";
import { agregarEstatusVisita, confirmarVisita, getFotoDomicilio, getVisitasPendientes } from "../controller/visitasController";
import { validarArchivo } from "../middlewares/validarArchivo";

const visitaRouter = Router();

visitaRouter.get("/visitasPendientes", getVisitasPendientes);
visitaRouter.post("/actualizarEstatus", agregarEstatusVisita);
visitaRouter.post("/confirmarVisita", [
    validarArchivo
],confirmarVisita);
visitaRouter.get("/fotoDomicilio", getFotoDomicilio);

export default visitaRouter;