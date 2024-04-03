import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario, { UsuarioInstance } from "../modelo/usuario";

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

export const editarUsuario = async (req: Request, res: Response) => {
    const { idUsuario, nombre, primerApellido, segundoApellido, puesto, fechaContratacion, sueldo, correo, contrasenia } = req.body;

    try {
        // Buscar el usuario por su idUsuario
        const usuario = await Usuario.findByPk(idUsuario);

        if (!usuario) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }

        // Actualizar los campos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.primerApellido = primerApellido || usuario.primerApellido;
        usuario.segundoApellido = segundoApellido || usuario.segundoApellido;
        usuario.puesto = puesto || usuario.puesto;
        usuario.fechaContratacion = fechaContratacion || usuario.fechaContratacion;
        usuario.sueldo = sueldo || usuario.sueldo;
        usuario.correo = correo || usuario.correo;

        // Si se proporciona una nueva contraseña, hash it
        if (contrasenia) {
            const salt = bcryptjs.genSaltSync(10);
            const password = bcryptjs.hashSync(contrasenia, salt);
            usuario.contrasenia = password;
        }

        // Guardar los cambios en la base de datos
        await usuario.save();

        res.send({ usuario });
    } catch (e) {
        return res.status(500).send({ e });
    }
};

export const borrarUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.body;
  
    try {
      // Buscar el usuario por su idUsuario
      const usuario = await Usuario.findByPk<UsuarioInstance>(idUsuario);
  
      if (!usuario) {
        return res.status(404).send({ msg: "Usuario no encontrado" });
      }
  
      // Cambiar el estatus del usuario a "BA" (baja)
      usuario.estatus = "BA";
  
      // Guardar los cambios en la base de datos
      await usuario.save();
  
      res.send({ usuario });
    } catch (e) {
      return res.status(500).send({ e });
    }
  };

  export const bloquearUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.body;
  
    try {
      // Buscar el usuario por su idUsuario
      const usuario = await Usuario.findByPk<UsuarioInstance>(idUsuario);
  
      if (!usuario) {
        return res.status(404).send({ msg: "Usuario no encontrado" });
      }
  
      // Cambiar el estatus del usuario a "BA" (baja)
      usuario.estatus = "BL";
  
      // Guardar los cambios en la base de datos
      await usuario.save();
  
      res.send({ usuario });
    } catch (e) {
      return res.status(500).send({ e });
    }
  };
