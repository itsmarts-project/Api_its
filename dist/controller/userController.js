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
exports.bloquearUsuario = exports.borrarUsuario = exports.editarUsuario = exports.registrarUsuario = exports.getRolUsuario = exports.getUsuario = void 0;
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
const getRolUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).send({
                msg: "El usuario no existe"
            });
        }
        return res.send({
            rol: usuario.puesto
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Chinga tu madre alexis"
        });
    }
});
exports.getRolUsuario = getRolUsuario;
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
const editarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario, nombre, primerApellido, segundoApellido, puesto, fechaContratacion, sueldo, correo, contrasenia } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = yield usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }
        // Actualizar los campos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.primerApellido = primerApellido || usuario.primerApellido;
        usuario.segundoApellido = segundoApellido || usuario.segundoApellido;
        usuario.puesto = puesto || usuario.puesto;
        usuario.fechaContratacion = fechaContratacion || usuario.fechaContratacion;
        usuario.sueldo = sueldo || usuario.sueldo;
        usuario.correo = correo || usuario.correo;
        // Si se proporciona una nueva contraseña, hash it
        if (contrasenia) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = bcryptjs_1.default.hashSync(contrasenia, salt);
            usuario.contrasenia = password;
        }
        // Guardar los cambios en la base de datos
        yield usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
});
exports.editarUsuario = editarUsuario;
const borrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = yield usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "BA";
        // Guardar los cambios en la base de datos
        yield usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
});
exports.borrarUsuario = borrarUsuario;
const bloquearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = yield usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "BL";
        // Guardar los cambios en la base de datos
        yield usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
});
exports.bloquearUsuario = bloquearUsuario;
//# sourceMappingURL=userController.js.map