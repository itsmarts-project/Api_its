"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarEstatusVisita = exports.getVisitasPendientes = void 0;
const visita_1 = __importDefault(require("../modelo/visita"));
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const getVisitasPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitas = yield visita_1.default.findAll({ where: { confirmacionSolicitante: false } });
        if (!visitas) {
            return res.status(404).send({
                msg: "Visitas no registradas"
            });
        }
        return res.send({
            visitas
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
});
exports.getVisitasPendientes = getVisitasPendientes;
const agregarEstatusVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, estatus, razon } = req.body;
    if (estatus === false || estatus === false || razon === false || id === false) {
        return res.status(401).send({
            msg: "Estatus vacio"
        });
    }
    const solicitante = yield solicitante_1.default.findByPk(id);
    if (!solicitante) {
        return res.status(404).send({
            msg: "Solicitante no encontrado"
        });
    }
    const visita = yield visita_1.default.findOne({ where: { solicitante_idSolicitante: solicitante.idSolicitante } });
    if (!visita) {
        return res.status(404).send({
            msg: "Registro no encontrado"
        });
    }
    const establecerEstatus = yield visita.update({ estatus: estatus, razon: razon });
    return res.send({
        visita
    });
});
exports.agregarEstatusVisita = agregarEstatusVisita;
//# sourceMappingURL=visitasController.js.map