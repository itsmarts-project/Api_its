
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import Visita from "../modelo/visita"
import Solicitante from '../modelo/solicitante';
import { subirArchivo } from "../helpers/subirFoto";
import Usuario from "../modelo/usuario";
import Domicilio from "../modelo/domicilio";




export const getVisitasPendientes = async(req: Request, res: Response) => {

    const {id} = req.body;
    try{
        
        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).send({
                msg: "El usuario no existe"
            })
        }

        const visitas = await Visita.findAll({where: {usuario_idUsuario: usuario.idUsuario, confirmacionSolicitante: false}});
        

        const solicitantes: any[] = [];
        const domicilios: any[] = [];

      
        for(let e of visitas){
            const solicitante = await Solicitante.findOne({where: {idSolicitante: e.solicitante_idSolicitante}});
            solicitantes.push(solicitante);

            const domicilio = await Domicilio.findOne({where: {solicitante_idSolicitante: solicitante?.idSolicitante}});
            domicilios.push(domicilio);

        }
        

        console.log(solicitantes);
        console.log(domicilios);
        
       


        return res.send({
            usuario,
            visitas,
            solicitantes,
            domicilios

        })
        

    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }

}

export const agregarEstatusVisita = async(req: Request, res: Response) => {

    const {id,estatus, razon, latitud, longitud} = req.body;
    const fotoCasa:UploadedFile | UploadedFile[] | undefined = req.files?.fotoCasa;
    console.log(fotoCasa);

    try{
    if (!fotoCasa || Array.isArray(fotoCasa)) {
        return res.status(404).send({ msg: 'Se esperaba un solo archivo' });
    }
    const foto:any = await subirArchivo(fotoCasa, ['img','jpg','png'], 'casas');

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
    const establecerEstatus = await visita.update({fotoDomicilio: foto, estatus: estatus, razon: razon, latitudVisita: latitud, longitudVisita: longitud });

    return res.send({
        establecerEstatus
    });

    }catch(e){
        return res.status(500).send({
            e
        })
    }


}

export const confirmarVisita = async(req: Request, res: Response) => {

    const {id, fecha, hora , latitud, longitud} = req.body;
 


    if(!id){
        return res.status(404).send({
            msg: "id no especificado"
        });
    }

    try{

        const solicitante = await Solicitante.findByPk(id);

        if(!solicitante){
            return res.status(404).send({
                msg: "El solicitante no existe"
            });
        }

        const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante.idSolicitante}});
        if(!visita){
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }

        await visita.update({confirmacionSolicitante: true, estatus: "EN", razon: "Encontrado", fecha: fecha, hora: hora, latitudVisita: latitud, longitudVisita: longitud });
    

        return res.send({
           visita
        })


    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }


};

export const getFotoSolicitante = async(req: Request, res: Response) => {

    const {id} = req.body;

    try{
        const solicitante = await Solicitante.findByPk(id);
        if(!solicitante){
            return res.status(404).send({
                msg: "solicitante no encontrado"
            });
        };

        /*
        const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante?.idSolicitante}});

        if(!visita){
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        
        */

        if(solicitante.fotoSolicitante){
            const imagePath = path.join(__dirname, '../uploads' ,'solicitantes',solicitante.fotoSolicitante);
            console.log(imagePath);
            if(fs.existsSync(imagePath)){
               return res.sendFile(imagePath);
            }

           return res.status(404).send({
                msg: "No image"
            })
        }

        return res.status(404).send({
            msg: "No image"
        })
        

    }catch(e){
        return res.status(500).send({
            msg: e
        });
    }

};
