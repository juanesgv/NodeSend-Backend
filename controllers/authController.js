import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import { validationResult } from "express-validator"

export const autenticarUsuario = async (req, res, next) => {

  //mostar mensaje de error de express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Buscar si el usuario está registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  console.log(usuario);

  if (!usuario) {
    res.status(401).json({ msg: "No se encontró el usuario" });
    return next();
  }

  //Verificar el password y autenticar el usuario
  if (await usuario.comprobarPassword(password)) {
    //crear jwt
    const token = generarJWT(usuario._id, usuario.nombre);
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token,
    });
  } else {
    res.status(401).json({ msg: "Contraseña incorrecta" });
  }
};

export const usuarioAutenticado = async (req, res) => {};
