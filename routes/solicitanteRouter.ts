import { Router } from "express";
import { agregarSolicitante } from "../controller/solicitanteController";
import { body } from "express-validator";

const solicitanteRouter = Router();

solicitanteRouter.post("/agregarSolicitante",
  [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("primerApellido").notEmpty().withMessage("El primer apellido es requerido"),
    body("genero").notEmpty().withMessage("El género es requerido"),
    body("edad").notEmpty().withMessage("La edad es requerida"),
    body("correo").notEmpty().withMessage("El correo es requerido").isEmail().withMessage("El correo debe ser válido")
  ],
  agregarSolicitante
);

export default solicitanteRouter;