import { Router } from "express";
import { /*bloquearUsuario, borrarUsuario, desbloquearUsuario, editarUsuario,*/ actualizarEnvioAEnviado, getEnvio, registrarEnvio } from "../controller/envioController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
//import validarRol from "../middlewares/validarRol";

const envioRouter = Router();


/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE 
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
envioRouter.get("/", [
    validarCampos
], getEnvio);


/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido", 
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
envioRouter.post("/registrarEnvio", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
], registrarEnvio);

envioRouter.post("/realizarEnvio", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
], registrarEnvio);

envioRouter.put("/entregarEnvio", [
    body('idEnvio').notEmpty()
], actualizarEnvioAEnviado);

export default envioRouter;
