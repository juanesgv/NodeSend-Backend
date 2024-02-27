import express from "express";
import { nuevoEnlace } from "../controllers/enlacesController.js";
import checkAuth from "../middleware/checkAuth.js";
import { check } from "express-validator";

const router = express.Router();

router.post('/',
  [
    check('nombre', 'Sube un archivo').not().isEmpty(),
    check('nombre_original', 'Sube un archivo').not().isEmpty(),
  ],
  checkAuth, 
  nuevoEnlace
)

export default router