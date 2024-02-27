import express from "express";
import {
  autenticarUsuario,
  usuarioAutenticado,
} from "../controllers/authController.js";
import { check } from "express-validator";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post(
  "/",
  [
    check("email", "Agregar un correo electrónico válido").isEmail(),
    check("password", "La contraseña no puede ir vacia").not().isEmpty(),
  ],
  autenticarUsuario
);

router.get("/", checkAuth,usuarioAutenticado);

export default router;
