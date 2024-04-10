"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const Repartidor = configdb_1.default.define("repartidor", {
    idRepartidor: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    primerApellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    segundoApellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasenia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false, tableName: "repartidor", schema: "packetpong" });
exports.default = Repartidor;
//# sourceMappingURL=repartidor.js.map