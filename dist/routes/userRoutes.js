"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const express_validator_1 = require("express-validator");
const userRouter = (0, express_1.Router)();
userRouter.get("/", userController_1.getUsuario);
userRouter.post("/registrarUsuario", [
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('puesto').notEmpty(),
    (0, express_validator_1.body)('fechaContratacion').notEmpty(),
    (0, express_validator_1.body)('sueldo').notEmpty()
], userController_1.registrarUsuario);
userRouter.post("/editarUsuario", [
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('puesto').notEmpty(),
    (0, express_validator_1.body)('fechaContratacion').notEmpty(),
    (0, express_validator_1.body)('sueldo').notEmpty()
], userController_1.editarUsuario);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map