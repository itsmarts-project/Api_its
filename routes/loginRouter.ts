import { Router } from "express";
import { login } from "../controller/loginController";


const loginRouter = Router();


/*METODO POST, RECIBE COMO PARAMETRO UN "correo" Y "contrasenia" VALIDOS, 
SOLO ADMITIDE A USUARIOS CON EL ESTATUS "AC" (ACTIVO), "BL" Y "BA" SE RECHAZARAN*/
loginRouter.post("/", login);

export default loginRouter;

