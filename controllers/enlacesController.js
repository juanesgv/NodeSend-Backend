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
  const { nombre_original } = req.body;
  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
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
