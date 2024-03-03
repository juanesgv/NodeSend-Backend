import Enlace from "../models/Enlace.js";
import shortid from "shortid";
import { validationResult } from "express-validator"

export const nuevoEnlace = async (req, res, next) => {
  //mostar mensaje de error de express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //almacenar enlance en la bd
  const { nombre_original, nombre } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;

  //si el usuario está autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    if (descargas) {
      enlace.descargas = descargas;
    }

    if (password) {
      enlace.password = password;
    }

    enlace.autor = req.usuario._id;
  }

  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

//obtener enlace
export const obtenerEnlace = async (req,res,next) => {

    const {url} = req.params

    //verificar si existe el enlace
    const enlace = await Enlace.findOne({url})
    if(!enlace){
        return res.status(404).json({msg: "El enlace no existe o ya caducó"})        
    }

    res.json({archivo: enlace.nombre})

    const {descargas, nombre} = enlace

    if(descargas === 1) {
        
        //eliminar archivo
        req.archivo = nombre

        //eliminar la entrada de la bd
        await Enlace.findOneAndDelete({url : req.params.url})

        next()
    }else{
        enlace.descargas--
        await enlace.save()
    }
}
