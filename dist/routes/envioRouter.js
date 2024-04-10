"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const envioController_1 = require("../controller/envioController");
const express_validator_1 = require("express-validator");
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
//import validarRol from "../middlewares/validarRol";
const envioRouter = (0, express_1.Router)();
/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
envioRouter.get("/", [
    ValidarErrores_1.default
], envioController_1.getEnvio);
/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido",
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
envioRouter.post("/registrarEnvio", [
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('correo').notEmpty(),
    (0, express_validator_1.body)('contrasenia').notEmpty(),
], envioController_1.registrarEnvio);
envioRouter.post("/realizarEnvio", [
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('correo').notEmpty(),
    (0, express_validator_1.body)('contrasenia').notEmpty(),
], envioController_1.registrarEnvio);
envioRouter.put("/entregarEnvio", [
    (0, express_validator_1.body)('idEnvio').notEmpty()
], envioController_1.actualizarEnvioAEnviado);
exports.default = envioRouter;
//# sourceMappingURL=envioRouter.js.map