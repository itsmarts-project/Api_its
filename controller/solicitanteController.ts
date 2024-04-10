
import { Request, Response } from "express"
import Solicitante from "../modelo/solicitante";
import Domicilio from "../modelo/domicilio";
import Formulario from "../modelo/formulario";
import databaseConnection from "../database/configdb";


export const getUsuariosPorVisitar = async(req: Request, res: Response) => {


    try{

        const solicitante = Solicitante.findAll({where: {}})

    }catch(e){

        return res.status(500).send({
            msg : "Hubo un error"
        });
    }

}



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
            msg: e
        })
    }

} 

export const editarSolicitante = async(req: Request, res: Response) => {

    //Accede a los elementos de la peticion
    const {id,reqSolicitante, reqDomicilio} = req.body;

    try{
        //Se inicia transaccion
        const resultado = databaseConnection.transaction(async(t) => {

            try{
  //Se busca al solicitante por el id
            const solicitante = await Solicitante.findByPk(id, {transaction: t});
            //Si el solicitante no existe devuelve un error
            if(!solicitante){
                return res.status(401).send({
                    msg: "El solicitante no existe"
                });
            }
            //Busca el domicilio por la llave foranea del solicitante
            const domicilio = await Domicilio.findByPk(solicitante.idSolicitante, {transaction: t});
            //Si el solicitante no existe retorna un error
            if(!domicilio){
                return res.status(500).send({
                    msg: "Error en el domicilio"
                });
            }
            //Actualiza el solicitante
            await solicitante.update(reqSolicitante);
            //Actualiza el domicilio
            await domicilio.update(reqDomicilio);

            return {solicitante, domicilio}
            }catch(e){
                return res.status(500).send({
                    msg: e
                });
            }
          
            
        });

        return res.send({
            resultado
        });

    }catch(e){
        return res.status(500).send({
            msg: "Hubo un error"
        })
    }


}

