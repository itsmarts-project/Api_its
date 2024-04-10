import { Router } from "express";
import { /*bloquearUsuario, borrarUsuario, desbloquearUsuario, editarUsuario,*/ getUsuario, registrarUsuario } from "../controller/userController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
//import validarRol from "../middlewares/validarRol";

const userRouter = Router();


/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE 
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
userRouter.get("/", [
    validarJWT,
    validarCampos
], getUsuario);


/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido", 
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
userRouter.post("/registrarUsuario", [
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
], registrarUsuario);



// /*POST (PARAMETRO OBLIGATORIO: idUsuario) PUEDE RECIBIR TODOS 
// LOS PARAMETROS DE "registrarUsuario" O SOLAMENTE LOS DATOS A EDITAR*/
// userRouter.post("/editarUsuario", editarUsuario);


// //METODO POST, RECIBE UNICAMENTE ID DE USUARIO
// userRouter.post("/borrarUsuario", borrarUsuario);


// //METODO POST, RECIBE UNICAMENTE ID DE USUARIO
// userRouter.post("/bloquearUsuario", bloquearUsuario);

// //METODO POST, RECIBE UNICAMENTE ID DE USUARIO
// userRouter.post("/desbloquearUsuario", desbloquearUsuario);



export default userRouter;

