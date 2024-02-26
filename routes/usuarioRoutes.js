import express from 'express'
import { nuevoUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

router.post('/', nuevoUsuario )

export default router