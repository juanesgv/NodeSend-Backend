import express from "express";
import { subirArchivo, eliminarArchivo } from "../controllers/archivosController.js";
import checkAuth from "../middleware/checkAuth.js";

//subida de archivos

const router = express.Router();

router.post('/', checkAuth, subirArchivo )
router.delete('/:id', eliminarArchivo )

export default router