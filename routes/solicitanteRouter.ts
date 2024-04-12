import { Router } from "express";
import { editarSolicitante, getUsuariosPorVisitar, guardarSolicitante } from "../controller/solicitanteController";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";
import validarCampos from "../middlewares/ValidarErrores";

const solicitanteRouter = Router();

solicitanteRouter.get("/getSolicitantes",[
    validarJWT,
    validarRol(["AD","CA"]),
    validarCampos
], getUsuariosPorVisitar)
solicitanteRouter.post("/registrar", [
    validarJWT,
    validarRol(["AD", "CA"]),
    validarCampos
],guardarSolicitante);
solicitanteRouter.put("/editar",[
    validarJWT,
    validarRol(["AD","CA"]),
    validarCampos
], editarSolicitante);


export default solicitanteRouter;