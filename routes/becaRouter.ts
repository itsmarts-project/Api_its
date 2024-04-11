import { Router } from "express";
import { aprobarBeca, rechazarBeca } from "../controller/becaController";


const becaRouter = Router();

becaRouter.put("/aprobar", aprobarBeca);
becaRouter.put("/rechazar", rechazarBeca);

export default becaRouter;