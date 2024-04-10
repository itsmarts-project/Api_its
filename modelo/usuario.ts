import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";

interface UsuarioAttributes {
  idUsuario: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  contrasenia: string;
}

export interface UsuarioInstance extends Model<UsuarioAttributes>, UsuarioAttributes {}

const Usuario = databaseConnection.define<UsuarioInstance>("usuario", {
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
  correo: {
    type: DataTypes.STRING
  },
  contrasenia: {
    type: DataTypes.STRING
  },
}, { timestamps: false, tableName: "usuario", schema: "packetpong" });

export default Usuario;