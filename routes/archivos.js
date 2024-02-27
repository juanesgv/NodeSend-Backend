import express from "express";
import { subirArchivo, } from "../controllers/archivosController.js";
import checkAuth from "../middleware/checkAuth.js";

//subida de archivos

const router = express.Router();

router.post('/', checkAuth, subirArchivo )

export default router