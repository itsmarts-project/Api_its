import {v4 as uuidv4} from 'uuid';
import * as path from "path";
import { UploadedFile } from 'express-fileupload';
import { fileURLToPath } from 'url';

export const subirArchivo = async(files: UploadedFile, extensionesPermitidas = ['img', 'png', 'jpg'], carpeta = '') => {
 
 
 
    return new Promise(async(resolve, reject) => {
        const archivo = files
        console.log(__dirname);
        console.log(archivo);
        const archivoPartes = archivo.name.split('.');
        const extension = archivoPartes[archivoPartes.length - 1];
        console.log(extension);
    
        if(!extensionesPermitidas.includes(extension)){
           return reject("Archivo no permitido");
        }
    
        const finalFileName: string =  uuidv4() + '.' + extension;
        const uploadPath = path.resolve(__dirname, '../../uploads' ,carpeta,finalFileName);
      

        
        archivo.mv(uploadPath, function(err: Error) {
          if (err) {return reject}
        });

      
        resolve(finalFileName);
       
    })
  
   
}
