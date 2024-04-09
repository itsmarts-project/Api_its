
import { Request, Response } from "express"
import Visita from "../modelo/visita"
import Solicitante from "../modelo/solicitante";
export const getVisitasPendientes = async(req: Request, res: Response) => {


    try{
        const visitas = await Visita.findAll({where: { confirmacionSolicitante: false }});

        if(!visitas){
            return res.status(404).send({
                msg: "Visitas no registradas"
            });
        }

        return res.send({
            visitas
        })

    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }

}