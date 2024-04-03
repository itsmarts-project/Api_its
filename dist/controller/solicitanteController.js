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
exports.guardarSolicitante = void 0;
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const domicilio_1 = __importDefault(require("../modelo/domicilio"));
const formulario_1 = __importDefault(require("../modelo/formulario"));
const configdb_1 = __importDefault(require("../database/configdb"));
const guardarSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Se accede a los valores del request
    const { solicitante, domicilio, formulario } = req.body;
    try {
        //Se inicia una transaccion
        const resultados = yield configdb_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            //Se guarda en base de datos el solicitante
            const createSolicitante = yield solicitante_1.default.create(solicitante, { transaction: t });
            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = yield domicilio_1.default.create(Object.assign(Object.assign({}, domicilio), { solicitante_idSolicitante: createSolicitante.idSolicitante }), { transaction: t });
            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = yield formulario_1.default.create(Object.assign(Object.assign({}, formulario), { solicitante_idSolicitante: createSolicitante.idSolicitante }), { transaction: t });
            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            };
        }));
        res.send({
            resultados
        });
    }
    catch (e) {
        res.status(500).send({
            msg: "Hubo un error"
        });
    }
});
exports.guardarSolicitante = guardarSolicitante;
//# sourceMappingURL=solicitanteController.js.map