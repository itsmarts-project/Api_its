
import { Request, Response } from "express"
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

import Solicitante from '../modelo/solicitante';
import Domicilio from "../modelo/domicilio";
import Formulario from "../modelo/formulario";
import databaseConnection from "../database/configdb";
import { UploadedFile } from "express-fileupload";
import { subirArchivo } from "../helpers/subirFoto";


//Trae los usuarios por visitar
export const getUsuariosPorVisitar = async(req: Request, res: Response) => {


    try{

        //trae todos los solicitantes
        const solicitante = await Solicitante.findAll();
        //envia como respuesta los solicitantes
        return res.send({
            solicitante
        })

    //atrapa el error
    }catch(e){
        //envia como respuesta el error
        return res.status(500).send({
            msg : "Hubo un error"
        });
    }

}


//Guarda un nuevo solicitante
export const guardarSolicitante = async(req: Request, res: Response) => {

   
    try{
            //Se accede a los valores del request
            const datos = req.body.data;
            const fotoSolicitante: UploadedFile | UploadedFile[] | undefined = req.files?.fotoSolicitante;
            
            //parsea el form-data data a json
            const datosJson = JSON.parse(datos);
            //extrae las propiedades del json ya parseado 
            const {solicitante, domicilio, formulario} = datosJson;
            //verifica si la foto solicitante esta vacia o si son varias fotos
            if (!fotoSolicitante || Array.isArray(fotoSolicitante)) {
                return res.status(404).send({ msg: 'Hubo un error' });
            }

         
        //Se inicia una transaccion
        const resultados = await databaseConnection.transaction(async(t) => {

            //Se guarda la foto en cloudinary
            const foto = await cloudinary.uploader.upload(fotoSolicitante.tempFilePath);

            //al campo fotoSolicitante se le asigna como valor la secure_url de la foto
            solicitante.fotoSolicitante = foto.secure_url;

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
                createFormulario,
                foto
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
                return res.status(404).send({
                    msg: "Hubo un error"
                });
            }
            //Busca el domicilio por la llave foranea del solicitante
            const domicilio = await Domicilio.findByPk(solicitante.idSolicitante, {transaction: t});
            //Si el solicitante no existe retorna un error
            if(!domicilio){
                return res.status(500).send({
                    msg: "Hubo un error"
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



