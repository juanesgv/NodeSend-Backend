import express from "express";
import { subirArchivo, descargarArchivo, eliminarArchivo } from "../controllers/archivosController.js";
import checkAuth from "../middleware/checkAuth.js";

//subida de archivos

const router = express.Router();

router.post('/', checkAuth, subirArchivo )

router.get('/:archivo', descargarArchivo, eliminarArchivo )

export default router