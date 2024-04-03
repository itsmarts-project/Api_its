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
const usuario_1 = __importDefault(require("../modelo/usuario"));
const validarRol = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.uid;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(401).send({
                msg: "No existe el usuario"
            });
        }
        const puesto = usuario.puesto;
        if (!roles.includes(puesto)) {
            return res.status(401).send({
                msg: "Acceso no permitido"
            });
        }
        next();
    });
};
exports.default = validarRol;
//# sourceMappingURL=validarRol.js.map