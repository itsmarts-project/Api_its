
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

export const agregarEstatusVisita = async(req: Request, res: Response) => {

    const {id,estatus, razon} = req.body;

    if(estatus === false || estatus === false || razon === false || id === false){
        return res.status(401).send({
            msg: "Estatus vacio"
        });
    }

    const solicitante = await Solicitante.findByPk(id);
    if(!solicitante){
        return res.status(404).send({
            msg: "Solicitante no encontrado"
        });
    }
    const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante.idSolicitante}});
    if(!visita){
        return res.status(404).send({
            msg: "Registro no encontrado"
        });
    }
    const establecerEstatus = await visita.update({estatus: estatus, razon: razon});

    return res.send({
        visita
    });




}