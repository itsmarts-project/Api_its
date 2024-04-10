import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";

interface EnvioAttributes {
  idEnvio: number;
  estatus: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
  cp: string;
  Ciudad: string;
  Estado: string;
  pesoPaquete: string;
  fechaSolicitud: string;
  usuario_idUsuario: number;
}

export interface EnvioInstance extends Model<EnvioAttributes>, EnvioAttributes {}

const Envio = databaseConnection.define<EnvioInstance>("envio", {
  idEnvio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  estatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ACTIVO'
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroExterior: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroInterior: {
    type: DataTypes.STRING,
    allowNull: true
  },
  colonia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ciudad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pesoPaquete: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaSolicitud: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario_idUsuario: {
    type: DataTypes.INTEGER,
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

export default Envio;