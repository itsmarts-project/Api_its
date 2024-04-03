import { Router } from "express";
import { guardarSolicitante } from "../controller/solicitanteController";

const solicitanteRouter = Router();

solicitanteRouter.post("/registrar", guardarSolicitante);

export default solicitanteRouter;