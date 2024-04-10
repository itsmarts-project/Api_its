import { Router } from "express";
import { editarSolicitante, getUsuariosPorVisitar, guardarSolicitante } from "../controller/solicitanteController";

const solicitanteRouter = Router();

solicitanteRouter.get("/getSolicitantes", getUsuariosPorVisitar)
solicitanteRouter.post("/registrar", guardarSolicitante);
solicitanteRouter.put("/editar", editarSolicitante);


export default solicitanteRouter;