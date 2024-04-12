
import { Request, Response } from "express"
import Visita from "../modelo/visita"
import Solicitante from '../modelo/solicitante';

export const aprobarBeca = async(req: Request, res: Response) => {


    const {id} = req.body;

    try{

        const solicitante = await Solicitante.findByPk(id);
        if(!solicitante){
            return res.status(404).send({
                msg: "Solicitante no existe"
            })
        }
        await solicitante.update({montoAprobado: solicitante.montoSolicitado, estatus: "Aprobado"});

        return res.send({
            solicitante
        })

        

    }catch(e){
        return res.status(500).send({
            e
        })
    }
}

export const rechazarBeca = async(req: Request, res: Response) => {

    const {id} = req.body;

    try{

        const solicitante = await Solicitante.findByPk(id);

        if(!solicitante){
            return res.status(404).send({
                msg: "Solicitante no existe"
            })
        }

        await solicitante.update({montoAprobado: 0, estatus: "Rechazado"});

        return res.send({
            solicitante
        })

    }catch(e){
        return res.status(500).send({
            msg: "Hubo un error"
        })
    }

}

