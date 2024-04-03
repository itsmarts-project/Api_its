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
exports.agregarSolicitante = void 0;
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const agregarSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const solicitantereq = req.body;
    try {
        const solicitante = solicitante_1.default.build(solicitantereq);
        solicitante.save();
        res.send({
            solicitante
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            error
        });
    }
});
exports.agregarSolicitante = agregarSolicitante;
//# sourceMappingURL=solicitanteController.js.map