import express from 'express'
import { nuevoUsuario } from '../controllers/usuarioController.js'
import { check } from 'express-validator'

const router = express.Router()

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('email', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6}),
    ], 
    nuevoUsuario )

export default router