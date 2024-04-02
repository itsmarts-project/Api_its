import { DataTypes } from "sequelize";
import databaseConnection from "../database/configdb";


const Usuario = databaseConnection.define('usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    primerApellido: {
        type: DataTypes.STRING
    },
    segundoApellido: {
        type: DataTypes.STRING
    },
    puesto: {
        type: DataTypes.STRING
    },
    fechaContratacion: {
        type: DataTypes.DATEONLY
    },
    sueldo: {
        type: DataTypes.FLOAT
    },
    correo: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.STRING,
        defaultValue: 'AC'
    }

}, {timestamps: false, tableName: "usuario", schema: "geoapoyos"});

export default Usuario;