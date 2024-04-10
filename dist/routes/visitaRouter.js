"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitasController_1 = require("../controller/visitasController");
const validarArchivo_1 = require("../middlewares/validarArchivo");
const visitaRouter = (0, express_1.Router)();
visitaRouter.get("/visitasPendientes", visitasController_1.getVisitasPendientes);
visitaRouter.post("/actualizarEstatus", visitasController_1.agregarEstatusVisita);
visitaRouter.post("/confirmarVisita", [
    validarArchivo_1.validarArchivo
], visitasController_1.confirmarVisita);
visitaRouter.get("/fotoDomicilio", visitasController_1.getFotoDomicilio);
exports.default = visitaRouter;
//# sourceMappingURL=visitaRouter.js.map