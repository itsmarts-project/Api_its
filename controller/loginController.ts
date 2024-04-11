
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from '../modelo/usuario';
import { generateToken } from "../helpers/generarToken";
const mailgun = require("mailgun.js");


export const login = async (req: Request, res: Response) => {

  const { correo, contrasenia } = req.body;
  try {

    const usuario: any = await Usuario.findOne({ where: { correo } });

    if (!usuario || usuario.estatus === "BA") {
      return res.status(401).send({
        msg: "El usuario no existe"
      })
    }

    if (usuario.estatus === "BL") {
      return res.status(401).send({
        msg: "Usuario bloqueado, comuniquese con el administrador"
      })
    }

    const passwordVerification = bcryptjs.compareSync(contrasenia, usuario.contrasenia);

    if (!passwordVerification) {
      return res.status(401).send({
        msg: "Contraseña incorrecta"
      })
    }

    const token = await generateToken(usuario.idUsuario);

    return res.send({
      token
    })


  } catch (e) {
    return res.status(500).send({
      e
    })
  }

}


export const cambiarContrasenia = async (req: Request, res: Response) => {

  const { correo } = req.body;
  const nombreU: any = await Usuario.findOne({ where: { correo: correo } });
  const nombreUsuario = nombreU.nombre;
  const idU: any = await Usuario.findOne({ where: { correo: correo } });
  const idUsuario = idU.idUsuario;
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'df812e8161468d1b37c8f58b7c686b29-4b670513-70c0b60e' });

  mg.messages.create('sandboxe71fa513f7484a849cf7f84c6d83a9b4.mailgun.org', {
    from: "Soporte <geoapoyosequipoazul@gmail.com>",
    to: ["ageoapoyos@gmail.com"],
    subject: `Solicitud para restablecer contraseña - Usuario: ${nombreUsuario}`,
    text: `Mensaje Autogenerado`,
    html: `<h2>Buen dia.<br> Este es un correo autogenerado para notificar que el usuario ${nombreUsuario} con ID "${idUsuario}" y con correo "${correo}" ha solicitado un cambio de contraseña, el cambio queda a su discreción. Al finalizar favor de contactarse con el empleado para ser notificado.<br>PD: Favor de no responder a este correo.</h2>`
  })
    .then((msg: any) => {
      return res.send({
        msg: "Correo enviado"
      });
    }) 
    .catch((err: any) => {
      return res.status(500).send({
        msg: "Error al enviar correo"
      })
    }); 

}


export const solicitarDesbloqueo = async (req: Request, res: Response) => {

  const { correo } = req.body;
  const nombreU: any = await Usuario.findOne({ where: { correo: correo } });
  const nombreUsuario = nombreU.nombre;
  const idU: any = await Usuario.findOne({ where: { correo: correo } });
  const idUsuario = idU.idUsuario;
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'df812e8161468d1b37c8f58b7c686b29-4b670513-70c0b60e' });

  mg.messages.create('sandboxe71fa513f7484a849cf7f84c6d83a9b4.mailgun.org', {
    from: "Soporte <geoapoyosequipoazul@gmail.com>",
    to: ["ageoapoyos@gmail.com"],
    subject: `Solicitud para desbloquear cuenta - Usuario: ${nombreUsuario}`,
    text: `Mensaje Autogenerado`,
    html: `<h2>Buen dia.<br> Este es un correo autogenerado para notificar que el usuario ${nombreUsuario} con ID "${idUsuario}" y con correo "${correo}" ha solicitado el desbloqueo de su cuenta, el cambio queda a su discreción. Al finalizar favor de contactarse con el empleado para ser notificado.<br>PD: Favor de no responder a este correo.</h2>`
  })
    .then((msg: any) => {
      return res.send({
        msg: "Correo enviado"
      });
    }) 
    .catch((err: any) => {
      return res.status(500).send({
        msg: "Error al enviar correo"
      })
    }); 

}
