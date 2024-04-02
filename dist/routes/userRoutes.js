"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const express_validator_1 = require("express-validator");
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
const validarToken_1 = __importDefault(require("../middlewares/validarToken"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", [
    validarToken_1.default,
    ValidarErrores_1.default
], userController_1.getUsuario);
userRouter.post("/", [
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('puesto').notEmpty(),
    (0, express_validator_1.body)('fechaContratacion').notEmpty(),
    (0, express_validator_1.body)('sueldo').notEmpty(),
    ValidarErrores_1.default
], userController_1.registrarUsuario);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map