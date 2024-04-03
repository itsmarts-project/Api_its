import { Router } from "express";
import { bloquearUsuario, borrarUsuario, editarUsuario, getUsuario, registrarUsuario } from "../controller/userController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";

const userRouter = Router();


userRouter.get("/",[
    validarJWT,
    validarRol(['AD']),
    validarCampos
] ,getUsuario);

userRouter.post("/registrarUsuario", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('puesto').notEmpty(),
    body('fechaContratacion').notEmpty(),
    body('sueldo').notEmpty()
],registrarUsuario);

userRouter.post("/editarUsuario", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('puesto').notEmpty(),
    body('fechaContratacion').notEmpty(),
    body('sueldo').notEmpty()
],editarUsuario);

userRouter.post("/borrarUsuario", borrarUsuario);

userRouter.post("/bloquearUsuario", bloquearUsuario);


export default userRouter;

