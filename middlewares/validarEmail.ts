import { Request, Response } from "express";
import Usuario, { UsuarioInstance } from "../modelo/usuario";
import { where } from "sequelize";

const validarCorreoUsuario = async(req: Request, res: Response, next: any) => {
    const {correo} = req.body;

    try{

        const usuario = await Usuario.findOne({where: {correo: correo}});
        console.log(usuario);

        if(usuario){
            return res.status(401).send({
                msg: "Correo ya registrado"
            })
        }

        next();

    }catch(e){
        res.status(500).send({
            msg: e
        })
    }

};



export default validarCorreoUsuario;