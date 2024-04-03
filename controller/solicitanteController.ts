
import { Request, Response } from "express"
import Solicitante from "../modelo/solicitante";
import Domicilio from "../modelo/domicilio";
import Formulario from "../modelo/formulario";
import databaseConnection from "../database/configdb";

export const guardarSolicitante = async(req: Request, res: Response) => {

    //Se accede a los valores del request
    const {solicitante, domicilio, formulario} = req.body;

    try{
        //Se inicia una transaccion
        const resultados = await databaseConnection.transaction(async(t) => {

            //Se guarda en base de datos el solicitante
            const createSolicitante = await Solicitante.create(solicitante, {transaction: t});

            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = await Domicilio.create({
                ...domicilio,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, {transaction: t});

            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = await Formulario.create({
                ...formulario,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, {transaction: t});


            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            }


        });
        res.send({
            resultados
        })

    }catch(e){
        res.status(500).send({
            msg: "Hubo un error"
        })
    }

} 

