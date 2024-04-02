import jwt from "jsonwebtoken";


const generateToken = (idUsuario: Number) => {

    return new Promise((resolve, reject) => {
        const payload = {idUsuario};

        jwt.sign(payload, process.env.TOKENFIRM || "22001t5m4r7s" , { expiresIn: '3d'} , (err, token) => {
            if(err){
                reject('No se genero el token');
            }
            resolve(token);
        });

    })

}

export {generateToken}