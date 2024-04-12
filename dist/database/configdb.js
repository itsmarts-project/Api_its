"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseConnection = new sequelize_1.Sequelize('itsmarts', 'doadmin', 'AVNS_rO7Wlu0CGBP_AKJ7-yk', {
    host: 'itsmarts-do-user-16290119-0.c.db.ondigitalocean.com',
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
exports.default = databaseConnection;
//# sourceMappingURL=configdb.js.map