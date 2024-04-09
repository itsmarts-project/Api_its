
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import Visita from "../modelo/visita"
import Solicitante from "../modelo/solicitante";
import { subirArchivo } from "../helpers/subirFoto";
import Usuario from "../modelo/usuario";




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

export const confirmarVisita = async(req: Request, res: Response) => {

    const {id} = req.body;
    const fotoCasa:UploadedFile | UploadedFile[] | undefined = req.files?.fotoCasa;
    console.log(fotoCasa);

    if (!fotoCasa || Array.isArray(fotoCasa)) {
        return res.status(404).send({ msg: 'Se esperaba un solo archivo' });
    }

    if(!id){
        return res.status(404).send({
            msg: "id no especificado"
        });
    }

    try{
        
        const foto:any = await subirArchivo(fotoCasa, ['img','jpg','png'], 'casas');

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

        await visita.update({fotoDomicilio: foto});
    

        return res.send({
            foto
        })


    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }


};

export const getFotoDomicilio = async(req: Request, res: Response) => {

    const {id} = req.body;

    try{
        const solicitante = await Solicitante.findByPk(id);
        if(!solicitante){
            return res.status(404).send({
                msg: "solicitante no encontrado"
            });
        };

        const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante?.idSolicitante}});

        if(!visita){
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        
        if(visita.fotoDomicilio){
            const imagePath = path.join(__dirname, '../uploads' ,'casas',visita.fotoDomicilio);
            console.log(imagePath);
            if(fs.existsSync(imagePath)){
               return res.sendFile(imagePath);
            }
           return res.status(404).send({
                msg: "No image"
            })
        }
        

    }catch(e){
        return res.status(500).send({
            msg: e
        });
    }

};