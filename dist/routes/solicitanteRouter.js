"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitanteController_1 = require("../controller/solicitanteController");
const solicitanteRouter = (0, express_1.Router)();
solicitanteRouter.post("/registrar", solicitanteController_1.guardarSolicitante);
exports.default = solicitanteRouter;
//# sourceMappingURL=solicitanteRouter.js.map