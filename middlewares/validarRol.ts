
import { Response, Request } from "express";
import Usuario from "../modelo/usuario";

const validarRol = (roles: string[]) => {

return async(req: Request, res: Response, next: any) => {
    const {id} = (req as any).uid;

    const usuario = await Usuario.findByPk(id);
    

    if(!usuario){
        return res.status(401).send({
            msg: "No existe el usuario"
        })
    }
    const puesto = usuario.puesto;
    
    if(!roles.includes(puesto)){
        return res.status(401).send({
            msg: "Acceso no permitido"
        })
    }

    next();
}


}

export default validarRol;