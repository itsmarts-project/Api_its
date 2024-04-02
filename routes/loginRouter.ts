import { Router } from "express";
import { login } from "../controller/loginController";


const loginRouter = Router();

loginRouter.post("/", login);

export default loginRouter;

