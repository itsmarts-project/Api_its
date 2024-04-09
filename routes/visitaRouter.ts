import { Router } from "express";
import { agregarEstatusVisita, getVisitasPendientes } from "../controller/visitasController";

const visitaRouter = Router();

visitaRouter.get("/visitasPendientes", getVisitasPendientes);
visitaRouter.post("/actualizarEstatus", agregarEstatusVisita);

export default visitaRouter;