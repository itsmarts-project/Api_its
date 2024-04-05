import { Router } from "express";
import { editarSolicitante, guardarSolicitante } from "../controller/solicitanteController";

const solicitanteRouter = Router();

solicitanteRouter.post("/registrar", guardarSolicitante);
solicitanteRouter.put("/editar", editarSolicitante);


export default solicitanteRouter;