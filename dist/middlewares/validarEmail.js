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
exports.validarCorreoSolicitante = exports.validarCorreoUsuario = void 0;
const usuario_1 = __importDefault(require("../modelo/usuario"));
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
//Valida que no se repita el correo del usuario a la hora de registrar
const validarCorreoUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { correo: correo } });
        console.log(usuario);
        if (usuario) {
            return res.status(401).send({
                msg: "Correo ya registrado"
            });
        }
        next();
    }
    catch (e) {
        res.status(500).send({
            msg: e
        });
    }
});
exports.validarCorreoUsuario = validarCorreoUsuario;
//Valida que no se repita el correo a la hora de registrar un solicitante
const validarCorreoSolicitante = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body.solicitante;
    try {
        const solicitante = yield solicitante_1.default.findOne({ where: { correo: correo } });
        console.log(solicitante);
        if (solicitante) {
            return res.status(401).send({
                msg: "Solicitante ya existente"
            });
        }
        next();
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
});
exports.validarCorreoSolicitante = validarCorreoSolicitante;
//# sourceMappingURL=validarEmail.js.map