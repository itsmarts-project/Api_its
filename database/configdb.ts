import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize('geoapoyos', 'postgres', '1924', {
    host:'localhost',
    dialect: 'postgres'
});

export default databaseConnection;