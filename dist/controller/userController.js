"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desbloquearUsuario = exports.bloquearUsuario = exports.borrarUsuario = exports.editarUsuario = exports.registrarUsuario = exports.getRolUsuario = exports.getUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
const getUsuario = async (req, res) => {
    try {
        const usuario = await usuario_1.default.findAll();
        res.send({
            usuario
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
};
exports.getUsuario = getUsuario;
const getRolUsuario = async (req, res) => {
    const { correo } = req.body;
    try {
        const usuario = await usuario_1.default.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).send({
                msg: "El usuario no existe"
            });
        }
        return res.send({
            usuario
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.getRolUsuario = getRolUsuario;
const registrarUsuario = async (req, res) => {
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
};
exports.registrarUsuario = registrarUsuario;
const editarUsuario = async (req, res) => {
    const { idUsuario, nombre, primerApellido, segundoApellido, puesto, sueldo, contrasenia, estatus, correo } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }
        // Actualizar los campos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.primerApellido = primerApellido || usuario.primerApellido;
        usuario.segundoApellido = segundoApellido || usuario.segundoApellido;
        usuario.puesto = puesto || usuario.puesto;
        usuario.sueldo = sueldo || usuario.sueldo;
        usuario.estatus = estatus || usuario.estatus;
        usuario.correo = correo || usuario.correo;
        // Si se proporciona una nueva contraseña, hash it
        if (contrasenia) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = bcryptjs_1.default.hashSync(contrasenia, salt);
            usuario.contrasenia = password;
        }
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
};
exports.editarUsuario = editarUsuario;
const borrarUsuario = async (req, res) => {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "BA";
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
};
exports.borrarUsuario = borrarUsuario;
const bloquearUsuario = async (req, res) => {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "BL";
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
};
exports.bloquearUsuario = bloquearUsuario;
const desbloquearUsuario = async (req, res) => {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "AC";
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ e });
    }
};
exports.desbloquearUsuario = desbloquearUsuario;
//# sourceMappingURL=userController.js.map