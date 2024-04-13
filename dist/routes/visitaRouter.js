"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitasController_1 = require("../controller/visitasController");
const visitaRouter = (0, express_1.Router)();
visitaRouter.post("/visitasPendientes", visitasController_1.getVisitasPendientes);
visitaRouter.put("/actualizarEstatus", visitasController_1.agregarEstatusVisita);
visitaRouter.put("/confirmarVisita", visitasController_1.confirmarVisita);
visitaRouter.post("/fotoSolicitante", visitasController_1.getFotoSolicitante);
exports.default = visitaRouter;
//# sourceMappingURL=visitaRouter.js.map