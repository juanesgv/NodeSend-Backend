import express from "express";
import { nuevoEnlace } from "../controllers/enlacesController.js";
import checkAuth from "../middleware/checkAuth.js";
import { check } from "express-validator";
import { obtenerEnlace, todosEnlances, verificarPassword } from "../controllers/enlacesController.js";

const router = express.Router();

router.post('/',
  [
    check('nombre', 'Sube un archivo').not().isEmpty(),
    check('nombre_original', 'Sube un archivo').not().isEmpty(),
  ],
  checkAuth, 
  nuevoEnlace
)

router.get('/', todosEnlances)

router.get('/:url', obtenerEnlace )

router.post('/:url', verificarPassword, obtenerEnlace )

export default router