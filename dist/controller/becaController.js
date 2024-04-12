"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechazarBeca = exports.aprobarBeca = void 0;
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const aprobarBeca = async (req, res) => {
    const { id } = req.body;
    try {
        const solicitante = await solicitante_1.default.findByPk(id);
        if (!solicitante) {
            return res.status(404).send({
                msg: "Solicitante no existe"
            });
        }
        await solicitante.update({ montoAprobado: solicitante.montoSolicitado, estatus: "Aprobado" });
        return res.send({
            solicitante
        });
    }
    catch (e) {
        return res.status(500).send({
            e
        });
    }
};
exports.aprobarBeca = aprobarBeca;
const rechazarBeca = async (req, res) => {
    const { id } = req.body;
    try {
        const solicitante = await solicitante_1.default.findByPk(id);
        if (!solicitante) {
            return res.status(404).send({
                msg: "Solicitante no existe"
            });
        }
        await solicitante.update({ montoAprobado: 0, estatus: "Rechazado" });
        return res.send({
            solicitante
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.rechazarBeca = rechazarBeca;
//# sourceMappingURL=becaController.js.map