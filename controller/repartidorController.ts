import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Repartidor, { RepartidorInstance } from "../modelo/repartidor";

export const getRepartidor = async(req: Request, res: Response) => {

    try{

        const repartidor = await Repartidor.findAll();
        res.send({
            repartidor
        })

    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }

}

export const registrarRepartidor = async(req: Request, res: Response) => {

    const repartidorreq = req.body;

    try{

        const salt = bcryptjs.genSaltSync(10);
        const password =bcryptjs.hashSync(repartidorreq.contrasenia, salt);

        repartidorreq.contrasenia = password;

        const repartidor = Repartidor.build(repartidorreq);
        repartidor.save();

        res.send({
            repartidor
        })

    }catch(e){
        return res.status(500).send({
            e
        })
    }
}
