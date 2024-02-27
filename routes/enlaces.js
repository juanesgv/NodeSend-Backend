import express from "express";
import { nuevoEnlace } from "../controllers/enlacesController.js";
import checkAuth from "../middleware/checkAuth.js";
import { check } from "express-validator";
import { obtenerEnlace } from "../controllers/enlacesController.js";
import { eliminarArchivo } from "../controllers/archivosController.js";

const router = express.Router();

router.post('/',
  [
    check('nombre', 'Sube un archivo').not().isEmpty(),
    check('nombre_original', 'Sube un archivo').not().isEmpty(),
  ],
  checkAuth, 
  nuevoEnlace
)

router.get('/:url', obtenerEnlace, eliminarArchivo )

export default router