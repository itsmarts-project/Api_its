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
exports.registrarUsuario = exports.getUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findAll();
        res.send({
            usuario
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
});
exports.getUsuario = getUsuario;
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioreq = req.body;
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const password = bcryptjs_1.default.hashSync(usuarioreq.contrasenia, salt);
        usuarioreq.contrasenia = password;
        const usuario = usuario_1.default.build(usuarioreq);
        usuario.save();
        res.send({
            usuario
        });
    }
    catch (e) {
        return res.status(500).send({
            e
        });
    }
});
exports.registrarUsuario = registrarUsuario;
//# sourceMappingURL=userController.js.map