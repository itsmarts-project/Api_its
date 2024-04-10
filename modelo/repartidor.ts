import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";

interface RepartidorAttributes {
  idRepartidor: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  contrasenia: string;
}

export interface RepartidorInstance extends Model<RepartidorAttributes>, RepartidorAttributes {}

const Repartidor = databaseConnection.define<RepartidorInstance>("repartidor", {
  idRepartidor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primerApellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  segundoApellido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }, 
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{ timestamps: false, tableName: "repartidor", schema: "packetpong" });

export default Repartidor;