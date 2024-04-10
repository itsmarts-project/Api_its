import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Envio, { EnvioInstance } from "../modelo/envio";

export const getEnvio = async(req: Request, res: Response) => {

    try{

        const envio = await Envio.findAll();
        res.send({
            envio
        })

    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }

}

export const registrarEnvio = async(req: Request, res: Response) => {

    const envioreq = req.body;

    try{
        const repartidor = Envio.build(envioreq);
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

export const actualizarEnvioAEnviado = async (req: Request, res: Response) => {
    const { idEnvio } = req.body;
    try {
        const envio = await Envio.findByPk(idEnvio);
        if (!envio) {
            return res.status(404).send({
                msg: 'Envío no encontrado'
            });
        }
        
        await envio.update({estatus: "ENVIADO"});
        res.send({
            envio
        });
    } catch (e) {
        return res.status(500).send({
            msg: e
        });
    }
};