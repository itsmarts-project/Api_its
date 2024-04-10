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
exports.actualizarEnvioAEnviado = exports.registrarEnvio = exports.getEnvio = void 0;
const envio_1 = __importDefault(require("../modelo/envio"));
const getEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envio = yield envio_1.default.findAll();
        res.send({
            envio
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
});
exports.getEnvio = getEnvio;
const registrarEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const envioreq = req.body;
    try {
        const repartidor = envio_1.default.build(envioreq);
        repartidor.save();
        res.send({
            repartidor
        });
    }
    catch (e) {
        return res.status(500).send({
            e
        });
    }
});
exports.registrarEnvio = registrarEnvio;
const actualizarEnvioAEnviado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEnvio } = req.body;
    try {
        const envio = yield envio_1.default.findByPk(idEnvio);
        if (!envio) {
            return res.status(404).send({
                msg: 'Envío no encontrado'
            });
        }
        yield envio.update({ estatus: "ENVIADO" });
        res.send({
            envio
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
});
exports.actualizarEnvioAEnviado = actualizarEnvioAEnviado;
//# sourceMappingURL=envioController.js.map