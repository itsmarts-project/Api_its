import { Router } from "express";
import { getUsuario, registrarUsuario } from "../controller/userController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";

const userRouter = Router();


userRouter.get("/", getUsuario);

userRouter.post("/", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('puesto').notEmpty(),
    body('fechaContratacion').notEmpty(),
    body('sueldo').notEmpty(),
    validarCampos
],registrarUsuario);


export default userRouter;

