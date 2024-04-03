import { Request, Response } from "express";
import Solicitante, { SolicitanteAttributes, SolicitanteInstance } from "../modelo/solicitante";

export const agregarSolicitante = async (req: Request, res: Response) => {
    const solicitantereq = req.body;
  
    try {

        const solicitante = Solicitante.build(solicitantereq);
        solicitante.save();

        res.send({
            solicitante
        })

    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error
    })
    }
  };

  export const editarSolicitante = async (req: Request, res: Response) => {
    const { idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, correo } = req.body;

    try {
        // Buscar el usuario por su idUsuario
        const solicitante = await Solicitante.findByPk(idSolicitante);

        if (!solicitante) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }

        // Actualizar los campos del usuario
         solicitante.nombre = nombre || solicitante.nombre;
         solicitante.primerApellido = primerApellido || solicitante.primerApellido;
         solicitante.segundoApellido = segundoApellido || solicitante.segundoApellido;
         solicitante.genero = genero || solicitante.genero;
         solicitante.edad = edad || solicitante.edad;
         solicitante.correo = correo || solicitante.correo;

        // Guardar los cambios en la base de datos
        await solicitante.save();

        res.send({ solicitante });
    } catch (e) {
        return res.status(500).send({ e });
    }
};