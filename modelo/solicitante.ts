import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";

export interface SolicitanteAttributes {
  idSolicitante: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string | null;
  genero: string;
  edad: string;
  correo: string;
}

export interface SolicitanteInstance extends Model<SolicitanteAttributes>, SolicitanteAttributes {}

const Solicitante = databaseConnection.define<SolicitanteInstance>("solicitante", {
  idSolicitante: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  primerApellido: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  segundoApellido: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  genero: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  edad: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  }
}, { timestamps: false, tableName: "solicitante", schema: "geoapoyos" });

export default Solicitante;