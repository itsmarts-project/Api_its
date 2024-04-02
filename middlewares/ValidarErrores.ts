import { Request, Response } from "express";
import { validationResult } from "express-validator";

const validarCampos = (req: Request, res: Response, next: any) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(401).send({
            errores
        })
    }

    next();
}


export {validarCampos}