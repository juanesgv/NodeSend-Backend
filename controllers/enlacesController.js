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

//obtiene un listado de todos los enlaces
export const todosEnlances = async (req, res) => {
  try {
    const enlaces = await Enlace.find({}).select('url -_id')
    res.json({enlaces})
  } catch (error) {
    console.log(error)
  }
}

//obtener enlace
export const obtenerEnlace = async (req,res,next) => {

    const {url} = req.params

    //verificar si existe el enlace
    const enlace = await Enlace.findOne({url})
    if(!enlace){
        return res.status(404).json({msg: "El enlace no existe o ya caducó"})        
    }

    if(enlace.password){
      return res.json({password: true, enlace: enlace.url, archivo: enlace.nombre})
    }else{
      res.json({password: false, enlace: enlace.url, archivo: enlace.nombre})
    }

}

export const verificarPassword = async (req, res, next) => {
  const {url} = req.params
  const {password} = req.body

  const enlace = await  await Enlace.findOne({url})

  if(await enlace.comprobarPassword(password)){
      //si puede descargar archivo
      next() 
  }else{
    return res.status(401).json({msg: 'Contraseña incorrecta'})
  }

}


