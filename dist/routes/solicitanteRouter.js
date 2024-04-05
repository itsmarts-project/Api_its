"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitanteController_1 = require("../controller/solicitanteController");
const validarToken_1 = __importDefault(require("../middlewares/validarToken"));
const validarEmail_1 = require("../middlewares/validarEmail");
const solicitanteRouter = (0, express_1.Router)();
solicitanteRouter.post("/registrar", solicitanteController_1.guardarSolicitante);
solicitanteRouter.put("/editar", solicitanteController_1.editarSolicitante);
exports.default = solicitanteRouter;
//# sourceMappingURL=solicitanteRouter.js.map