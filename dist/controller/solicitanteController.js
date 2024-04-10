"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarSolicitante = exports.guardarSolicitante = exports.getUsuariosPorVisitar = void 0;
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const domicilio_1 = __importDefault(require("../modelo/domicilio"));
const formulario_1 = __importDefault(require("../modelo/formulario"));
const configdb_1 = __importDefault(require("../database/configdb"));
const getUsuariosPorVisitar = async (req, res) => {
    try {
        const solicitante = solicitante_1.default.findAll({ where: {} });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.getUsuariosPorVisitar = getUsuariosPorVisitar;
const guardarSolicitante = async (req, res) => {
    //Se accede a los valores del request
    const { solicitante, domicilio, formulario } = req.body;
    try {
        //Se inicia una transaccion
        const resultados = await configdb_1.default.transaction(async (t) => {
            //Se guarda en base de datos el solicitante
            const createSolicitante = await solicitante_1.default.create(solicitante, { transaction: t });
            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = await domicilio_1.default.create({
                ...domicilio,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });
            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = await formulario_1.default.create({
                ...formulario,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });
            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            };
        });
        res.send({
            resultados
        });
    }
    catch (e) {
        res.status(500).send({
            msg: e
        });
    }
};
exports.guardarSolicitante = guardarSolicitante;
const editarSolicitante = async (req, res) => {
    //Accede a los elementos de la peticion
    const { id, reqSolicitante, reqDomicilio } = req.body;
    try {
        //Se inicia transaccion
        const resultado = configdb_1.default.transaction(async (t) => {
            try {
                //Se busca al solicitante por el id
                const solicitante = await solicitante_1.default.findByPk(id, { transaction: t });
                //Si el solicitante no existe devuelve un error
                if (!solicitante) {
                    return res.status(401).send({
                        msg: "El solicitante no existe"
                    });
                }
                //Busca el domicilio por la llave foranea del solicitante
                const domicilio = await domicilio_1.default.findByPk(solicitante.idSolicitante, { transaction: t });
                //Si el solicitante no existe retorna un error
                if (!domicilio) {
                    return res.status(500).send({
                        msg: "Error en el domicilio"
                    });
                }
                //Actualiza el solicitante
                await solicitante.update(reqSolicitante);
                //Actualiza el domicilio
                await domicilio.update(reqDomicilio);
                return { solicitante, domicilio };
            }
            catch (e) {
                return res.status(500).send({
                    msg: e
                });
            }
        });
        return res.send({
            resultado
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.editarSolicitante = editarSolicitante;
//# sourceMappingURL=solicitanteController.js.map