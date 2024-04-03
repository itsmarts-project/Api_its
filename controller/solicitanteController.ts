import { Request, Response } from "express";
import Solicitante, { SolicitanteAttributes, SolicitanteInstance } from "../modelo/solicitante";

export const agregarSolicitante = async (req: Request, res: Response) => {
    const solicitantereq = req.body;
  
    try {

        const solicitante = Solicitante.build(solicitantereq);
        solicitante.save();

        res.send({
            solicitante
        })

    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error
    })
    }
  };