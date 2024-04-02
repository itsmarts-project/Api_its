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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send({
            msg: "No se establacio ningun token"
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.TOKENFIRM || "22001t5m4r7s");
        req.uid = id;
        const usuarioValidado = yield usuario_1.default.findByPk(id);
        //VALIDA QUE EL USUARIO EXISTA EN LA BASE DE DATOS
        if (!usuarioValidado) {
            return res.status(401).send({
                msg: "Token no valido"
            });
        }
        //VALIDA QUE EL USUARIO ESTE ACTIVO
        if (usuarioValidado.estado === "BA") {
            return res.status(401).send({
                msg: "token no valido"
            });
        }
        req.usuario = usuarioValidado;
        next();
    }
    catch (e) {
        return res.status(401).send({
            msg: e
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validarToken.js.map