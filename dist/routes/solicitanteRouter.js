"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitanteController_1 = require("../controller/solicitanteController");
const validarToken_1 = __importDefault(require("../middlewares/validarToken"));
const validarRol_1 = __importDefault(require("../middlewares/validarRol"));
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
const solicitanteRouter = (0, express_1.Router)();
solicitanteRouter.get("/getSolicitantes", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD", "CA"]),
    ValidarErrores_1.default
], solicitanteController_1.getUsuariosPorVisitar);
solicitanteRouter.post("/registrar", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD", "CA"]),
    ValidarErrores_1.default
], solicitanteController_1.guardarSolicitante);
solicitanteRouter.put("/editar", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD", "CA"]),
    ValidarErrores_1.default
], solicitanteController_1.editarSolicitante);
exports.default = solicitanteRouter;
//# sourceMappingURL=solicitanteRouter.js.map