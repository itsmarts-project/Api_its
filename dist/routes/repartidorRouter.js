"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repartidorController_1 = require("../controller/repartidorController");
const express_validator_1 = require("express-validator");
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
//import validarRol from "../middlewares/validarRol";
const repartidorRouter = (0, express_1.Router)();
/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
repartidorRouter.get("/", [
    ValidarErrores_1.default
], repartidorController_1.getRepartidor);
/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido",
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
repartidorRouter.post("/registrarRepartidor", [
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('correo').notEmpty(),
    (0, express_validator_1.body)('contrasenia').notEmpty(),
], repartidorController_1.registrarRepartidor);
exports.default = repartidorRouter;
//# sourceMappingURL=repartidorRouter.js.map