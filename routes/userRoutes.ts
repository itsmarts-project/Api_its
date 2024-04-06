import { Router } from "express";
import { bloquearUsuario, borrarUsuario, editarUsuario, getRolUsuario, getUsuario, registrarUsuario } from "../controller/userController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";
import {validarCorreoUsuario} from "../middlewares/validarEmail";

const userRouter = Router();

//METODO GET QUE RECIBE UN CORREO ELECTRONICO Y DEVUELVE EL ROL
userRouter.get("/traerRolUsuario",[
    validarJWT,
    body('correo').notEmpty().isEmail(),
    validarCampos
] ,getRolUsuario);


/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE 
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
userRouter.get("/", [
    validarJWT,
    validarRol(['AD']),
    validarCampos
], getUsuario);


/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido", 
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
userRouter.post("/registrarUsuario", [
    validarJWT,
    validarCorreoUsuario,
    validarRol(["AD","VA"]),
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('puesto').notEmpty(),
    body('fechaContratacion').notEmpty(),
    body('sueldo').notEmpty(),
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
    validarCampos
], registrarUsuario);


/*POST (PARAMETRO OBLIGATORIO: idUsuario) PUEDE RECIBIR TODOS 
LOS PARAMETROS DE "registrarUsuario" O SOLAMENTE LOS DATOS A EDITAR*/
userRouter.post("/editarUsuario",[
    validarJWT,
    validarRol(["AD"]),
    body('idUsuario').notEmpty(),
    validarCampos
], editarUsuario);


//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.post("/borrarUsuario",[
    validarJWT,
    validarRol(["AD"]),
    body('idUsuario').notEmpty(),
    validarCampos
],borrarUsuario);


//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.post("/bloquearUsuario",[
    validarJWT,
    validarRol(['AD']),
    body('idUsuario').notEmpty(),
    validarCampos
],bloquearUsuario);


export default userRouter;

