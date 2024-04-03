"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controller/loginController");
const loginRouter = (0, express_1.Router)();
/*METODO POST, RECIBE COMO PARAMETRO UN "correo" Y "contrasenia" VALIDOS,
SOLO ADMITIDE A USUARIOS CON EL ESTATUS "AC" (ACTIVO), "BL" Y "BA" SE RECHAZARAN*/
loginRouter.post("/", loginController_1.login);
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map