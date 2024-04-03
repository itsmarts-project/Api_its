"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitanteController_1 = require("../controller/solicitanteController");
const express_validator_1 = require("express-validator");
const solicitanteRouter = (0, express_1.Router)();
solicitanteRouter.post("/agregarSolicitante", [
    (0, express_validator_1.body)("nombre").notEmpty().withMessage("El nombre es requerido"),
    (0, express_validator_1.body)("primerApellido").notEmpty().withMessage("El primer apellido es requerido"),
    (0, express_validator_1.body)("genero").notEmpty().withMessage("El género es requerido"),
    (0, express_validator_1.body)("edad").notEmpty().withMessage("La edad es requerida"),
    (0, express_validator_1.body)("correo").notEmpty().withMessage("El correo es requerido").isEmail().withMessage("El correo debe ser válido")
], solicitanteController_1.agregarSolicitante);
exports.default = solicitanteRouter;
//# sourceMappingURL=solicitanteRouter.js.map