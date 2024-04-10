"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitanteController_1 = require("../controller/solicitanteController");
const solicitanteRouter = (0, express_1.Router)();
solicitanteRouter.get("/getSolicitantes", solicitanteController_1.getUsuariosPorVisitar);
solicitanteRouter.post("/registrar", solicitanteController_1.guardarSolicitante);
solicitanteRouter.put("/editar", solicitanteController_1.editarSolicitante);
exports.default = solicitanteRouter;
//# sourceMappingURL=solicitanteRouter.js.map