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
exports.getFotoSolicitante = exports.confirmarVisita = exports.agregarEstatusVisita = exports.getVisitasPendientes = void 0;
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const visita_1 = __importDefault(require("../modelo/visita"));
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const subirFoto_1 = require("../helpers/subirFoto");
const usuario_1 = __importDefault(require("../modelo/usuario"));
const domicilio_1 = __importDefault(require("../modelo/domicilio"));
const getVisitasPendientes = async (req, res) => {
    const { id } = req.body;
    try {
        const usuario = await usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).send({
                msg: "El usuario no existe"
            });
        }
        const visitas = await visita_1.default.findAll({ where: { usuario_idUsuario: usuario.idUsuario, confirmacionSolicitante: false } });
        const solicitantes = [];
        const domicilios = [];
        for (let e of visitas) {
            const solicitante = await solicitante_1.default.findOne({ where: { idSolicitante: e.solicitante_idSolicitante } });
            solicitantes.push(solicitante);
            const domicilio = await domicilio_1.default.findOne({ where: { solicitante_idSolicitante: solicitante?.idSolicitante } });
            domicilios.push(domicilio);
        }
        console.log(solicitantes);
        console.log(domicilios);
        return res.send({
            usuario,
            visitas,
            solicitantes,
            domicilios
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
    const { id, estatus, razon, latitud, longitud } = req.body;
    const fotoCasa = req.files?.fotoCasa;
    console.log(fotoCasa);
    try {
        if (!fotoCasa || Array.isArray(fotoCasa)) {
            return res.status(404).send({ msg: 'Se esperaba un solo archivo' });
        }
        const foto = await (0, subirFoto_1.subirArchivo)(fotoCasa, ['img', 'jpg', 'png'], 'casas');
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
        const establecerEstatus = await visita.update({ fotoDomicilio: foto, estatus: estatus, razon: razon, latitudVisita: latitud, longitudVisita: longitud });
        return res.send({
            establecerEstatus
        });
    }
    catch (e) {
        return res.status(500).send({
            e
        });
    }
};
exports.agregarEstatusVisita = agregarEstatusVisita;
const confirmarVisita = async (req, res) => {
    const { id, fecha, hora, latitud, longitud } = req.body;
    if (!id) {
        return res.status(404).send({
            msg: "id no especificado"
        });
    }
    try {
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
        await visita.update({ confirmacionSolicitante: true, estatus: "EN", razon: "Encontrado", fecha: fecha, hora: hora, latitudVisita: latitud, longitudVisita: longitud });
        return res.send({
            visita
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
};
exports.confirmarVisita = confirmarVisita;
const getFotoSolicitante = async (req, res) => {
    const { id } = req.body;
    try {
        const solicitante = await solicitante_1.default.findByPk(id);
        if (!solicitante) {
            return res.status(404).send({
                msg: "solicitante no encontrado"
            });
        }
        ;
        /*
        const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante?.idSolicitante}});

        if(!visita){
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        
        */
        if (solicitante.fotoSolicitante) {
            const imagePath = path.join(__dirname, '../uploads', 'solicitantes', solicitante.fotoSolicitante);
            console.log(imagePath);
            if (fs_1.default.existsSync(imagePath)) {
                return res.sendFile(imagePath);
            }
            return res.status(404).send({
                msg: "No image"
            });
        }
        return res.status(404).send({
            msg: "No image"
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
};
exports.getFotoSolicitante = getFotoSolicitante;
//# sourceMappingURL=visitasController.js.map