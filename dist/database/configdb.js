"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseConnection = new sequelize_1.Sequelize('geoapoyos', 'postgres', '1924', {
    host: 'localhost',
    dialect: 'postgres'
});
exports.default = databaseConnection;
//# sourceMappingURL=configdb.js.map