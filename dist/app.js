"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./modelo/server");
dotenv_1.default.config();
const servidor = new server_1.Server();
servidor.listen();
//# sourceMappingURL=app.js.map