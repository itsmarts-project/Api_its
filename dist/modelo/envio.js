"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const Envio = configdb_1.default.define("envio", {
    idEnvio: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVO'
    },
    calle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    numeroExterior: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    numeroInterior: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    colonia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Ciudad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pesoPaquete: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaSolicitud: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    usuario_idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'idUsuario'
        }
    }
}, {
    timestamps: false,
    tableName: "envio",
    schema: "packetpong"
});
exports.default = Envio;
//# sourceMappingURL=envio.js.map