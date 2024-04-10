import { Router } from "express";
import { aprobarCredito } from "../controller/creditoController";

const creditoRouter = Router();

creditoRouter.put("/aprobar", aprobarCredito);