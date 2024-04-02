import express, {Application} from 'express';
import cors from 'cors';
import databaseConnection  from '../database/configdb';
import userRouter from '../routes/userRoutes';
import loginRouter from '../routes/loginRouter';

export class Server{
    private app: Application;
    private port: String;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.connection();
        this.routes();

    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());

    }

    async connection(){
        try{
            await databaseConnection.authenticate();
            console.log("Todo bien");
        }catch(e){
            throw new Error(`${e}`);
        }
    }

    routes(){
        this.app.use("/usuarios", userRouter);
        this.app.use("/login",loginRouter)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`servidor escuchando en el http://localhost:${this.port}/`)
        });
    }
}