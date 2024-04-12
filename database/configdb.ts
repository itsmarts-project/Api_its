import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize('itsmarts', 'doadmin', 'AVNS_rO7Wlu0CGBP_AKJ7-yk', {
    host:'itsmarts-do-user-16290119-0.c.db.ondigitalocean.com',
    dialect: 'postgres',
    port: 25060,
    protocol: 'null',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default databaseConnection;