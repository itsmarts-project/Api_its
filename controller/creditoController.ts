
import { Request, Response } from "express"
import Visita from "../modelo/visita"

export const aprobarCredito = async(req: Request, res: Response) => {

    try{

        

    }catch(e){
        return res.status(500).send({
            e
        })
    }
}