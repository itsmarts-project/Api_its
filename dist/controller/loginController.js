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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
const generarToken_1 = require("../helpers/generarToken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasenia } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { correo } });
        if (!usuario || usuario.estatus === "BA") {
            return res.status(401).send({
                msg: "El usuario no existe"
            });
        }
        if (usuario.estatus === "BL") {
            return res.status(401).send({
                msg: "Usuario bloqueado, comuniquese con el administrador"
            });
        }
        const passwordVerification = bcryptjs_1.default.compareSync(contrasenia, usuario.contrasenia);
        if (!passwordVerification) {
            return res.status(401).send({
                msg: "Contraseña incorrecta"
            });
        }
        const token = yield (0, generarToken_1.generateToken)(usuario.idUsuario);
        return res.send({
            token
        });
    }
    catch (e) {
        return res.status(500).send({
            e
        });
    }
});
exports.login = login;
//# sourceMappingURL=loginController.js.map