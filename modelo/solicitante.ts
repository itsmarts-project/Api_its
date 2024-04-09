import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";
import { now } from "sequelize/types/utils";

interface SolicitanteAttributes {
  idSolicitante: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string | null;
  genero: string;
  edad: string;
  correo: string;
  fechaAlta: string;
  montoAprobado: number;

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
  },
  fechaAlta: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  montoAprobado: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0
  }
}, { timestamps: false, tableName: "solicitante", schema: "geoapoyos" });

export default Solicitante;