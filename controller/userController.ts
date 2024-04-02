import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../modelo/usuario";

export const getUsuario = async(req: Request, res: Response) => {

    try{

        const usuario = await Usuario.findAll();
        res.send({
            usuario
        })

    }catch(e){
        return res.status(500).send({
            msg: e
        })
    }

}

export const registrarUsuario = async(req: Request, res: Response) => {

    const usuarioreq = req.body;

    try{

        const salt = bcryptjs.genSaltSync(10);
        const password =bcryptjs.hashSync(usuarioreq.contrasenia, salt);

        usuarioreq.contrasenia = password;

        const usuario = Usuario.build(usuarioreq);
        usuario.save();

        res.send({
            usuario
        })

    }catch(e){
        return res.status(500).send({
            e
        })
    }
}