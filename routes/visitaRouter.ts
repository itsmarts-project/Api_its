import { Router } from "express";
import { getVisitasPendientes } from "../controller/visitasController";

const visitaRouter = Router();

visitaRouter.get("/visitasPendientes", getVisitasPendientes);

export default visitaRouter;