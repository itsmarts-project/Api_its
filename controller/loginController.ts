
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from '../modelo/usuario';
import { generateToken } from "../helpers/generarToken";

export const login = async(req: Request, res: Response) => {

    const {correo, contrasenia} = req.body;
    try{

        const usuario: any = await Usuario.findOne({where: {correo}});

        if(!usuario || usuario.estatus === "BA"){
            return res.status(401).send({
                msg: "El usuario no existe"
            })
        }

        if(usuario.estatus === "BL"){
            return res.status(401).send({
                msg: "Usuario bloqueado, comuniquese con el administrador"
            })
        }

        const passwordVerification = bcryptjs.compareSync(contrasenia, usuario.contrasenia);

        if(!passwordVerification){
            return res.status(401).send({
                msg: "Contraseña incorrecta"
            })
        }

        const token = await generateToken(usuario.idUsuario);

        return res.send({
            token
        })


    }catch(e){
        return res.status(500).send({
            e
        })
    }

}

