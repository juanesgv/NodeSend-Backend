import multer from "multer";
import shortid from "shortid";

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from 'fs'
import Enlace from "../models/Enlace.js";

let fileStorage;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const subirArchivo = async (req, res, next) => {
    console.log("usuario autenticado",req.usuario)
  const configMulter = {
    limits: {
      fileSize: req.usuario ? (1024*1024)*10 : 1024*1024,
    },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid.generate()}.${extension}`);
      },
    })),
  };

  const upload = multer(configMulter).single("archivo");

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

export const eliminarArchivo = async (req, res) => {
    console.log("eliminando archivo")

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`)
        console.log('archivo eliminado')
    } catch (error) {
        console.log(error)
    }
};

//descarga un archivo
export const descargarArchivo = async(req, res, next)=>{

  //obtiene el enlace
  const enlace = await Enlace.findOne({
    nombre: req.params.archivo
  })

  const archivoDescarga = `${__dirname}/../uploads/${req.params.archivo}`
  res.download(archivoDescarga)

  //eliminar archivo y la entrada de la bd
  const {descargas, nombre} = enlace

    if(descargas === 1) {
        
        //eliminar archivo
        req.archivo = nombre

        //eliminar la entrada de la bd
        await Enlace.findOneAndDelete({url : enlace.url})

        next()
    }else{
        enlace.descargas--
        await enlace.save()
    }
}
