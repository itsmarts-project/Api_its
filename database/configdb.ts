import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize('packetpong', 'postgres', 'root', {
    host:'localhost',
    dialect: 'postgres'
});

export default databaseConnection;