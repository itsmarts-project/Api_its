"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitasController_1 = require("../controller/visitasController");
const visitaRouter = (0, express_1.Router)();
visitaRouter.get("/visitasPendientes", visitasController_1.getVisitasPendientes);
visitaRouter.post("/actualizarEstatus", visitasController_1.agregarEstatusVisita);
exports.default = visitaRouter;
//# sourceMappingURL=visitaRouter.js.map