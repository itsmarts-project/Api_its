import { Router } from "express";
import { /*bloquearUsuario, borrarUsuario, desbloquearUsuario, editarUsuario,*/ getRepartidor, registrarRepartidor } from "../controller/repartidorController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
//import validarRol from "../middlewares/validarRol";

const repartidorRouter = Router();


/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE 
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
repartidorRouter.get("/", [
    validarCampos
], getRepartidor);


/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido", 
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
repartidorRouter.post("/registrarRepartidor", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
], registrarRepartidor);


export default repartidorRouter;
