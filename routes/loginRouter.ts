import { Router } from "express";
import { login } from "../controller/loginController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";


const loginRouter = Router();


/*METODO POST, RECIBE COMO PARAMETRO UN "correo" Y "contrasenia" VALIDOS, 
SOLO ADMITIDE A USUARIOS CON EL ESTATUS "AC" (ACTIVO), "BL" Y "BA" SE RECHAZARAN*/
loginRouter.post("/",[
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
    validarCampos
], login);

export default loginRouter;

