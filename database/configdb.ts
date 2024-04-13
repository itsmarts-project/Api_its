import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();


const databaseConnection = new Sequelize('geoapoyos', 'postgres', '1924', {
    host:'localhost',
    dialect: 'postgres'
});
export default databaseConnection;