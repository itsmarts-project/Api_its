import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize('itsmarts', 'postgres', 'root', {
    host:'localhost',
    dialect: 'postgres'
});

export default databaseConnection;