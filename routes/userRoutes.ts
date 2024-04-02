import { Router } from "express";
import { editarUsuario, getUsuario, registrarUsuario } from "../controller/userController";
import { body } from "express-validator";

const userRouter = Router();


userRouter.get("/", getUsuario);

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



export default userRouter;

