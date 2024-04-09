"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFotoDomicilio = exports.confirmarVisita = exports.agregarEstatusVisita = exports.getVisitasPendientes = void 0;
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const visita_1 = __importDefault(require("../modelo/visita"));
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const subirFoto_1 = require("../helpers/subirFoto");
const getVisitasPendientes = async (req, res) => {
    try {
        const visitas = await visita_1.default.findAll({ where: { confirmacionSolicitante: false } });
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
};
exports.getVisitasPendientes = getVisitasPendientes;
const agregarEstatusVisita = async (req, res) => {
    const { id, estatus, razon } = req.body;
    if (estatus === false || estatus === false || razon === false || id === false) {
        return res.status(401).send({
            msg: "Estatus vacio"
        });
    }
    const solicitante = await solicitante_1.default.findByPk(id);
    if (!solicitante) {
        return res.status(404).send({
            msg: "Solicitante no encontrado"
        });
    }
    const visita = await visita_1.default.findOne({ where: { solicitante_idSolicitante: solicitante.idSolicitante } });
    if (!visita) {
        return res.status(404).send({
            msg: "Registro no encontrado"
        });
    }
    const establecerEstatus = await visita.update({ estatus: estatus, razon: razon });
    return res.send({
        visita
    });
};
exports.agregarEstatusVisita = agregarEstatusVisita;
const confirmarVisita = async (req, res) => {
    const { id } = req.body;
    const fotoCasa = req.files?.fotoCasa;
    console.log(fotoCasa);
    if (!fotoCasa || Array.isArray(fotoCasa)) {
        return res.status(404).send({ msg: 'Se esperaba un solo archivo' });
    }
    if (!id) {
        return res.status(404).send({
            msg: "id no especificado"
        });
    }
    try {
        const foto = await (0, subirFoto_1.subirArchivo)(fotoCasa, ['img', 'jpg', 'png'], 'casas');
        const solicitante = await solicitante_1.default.findByPk(id);
        if (!solicitante) {
            return res.status(404).send({
                msg: "El solicitante no existe"
            });
        }
        const visita = await visita_1.default.findOne({ where: { solicitante_idSolicitante: solicitante.idSolicitante } });
        if (!visita) {
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        await visita.update({ fotoDomicilio: foto });
        return res.send({
            foto
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
};
exports.confirmarVisita = confirmarVisita;
const getFotoDomicilio = async (req, res) => {
    const { id } = req.body;
    try {
        const solicitante = await solicitante_1.default.findByPk(id);
        if (!solicitante) {
            return res.status(404).send({
                msg: "solicitante no encontrado"
            });
        }
        ;
        const visita = await visita_1.default.findOne({ where: { solicitante_idSolicitante: solicitante?.idSolicitante } });
        if (!visita) {
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        if (visita.fotoDomicilio) {
            const imagePath = path.join(__dirname, '../uploads', 'casas', visita.fotoDomicilio);
            console.log(imagePath);
            if (fs_1.default.existsSync(imagePath)) {
                return res.sendFile(imagePath);
            }
            return res.status(404).send({
                msg: "No image"
            });
        }
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
};
exports.getFotoDomicilio = getFotoDomicilio;
//# sourceMappingURL=visitasController.js.map