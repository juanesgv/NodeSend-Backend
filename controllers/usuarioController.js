import Usuario from "../models/Usuario.js"
import { validationResult } from "express-validator"

export const nuevoUsuario = async (req, res) =>{

    //mostar mensaje de error de express validator
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }

    const {email} = req.body
    const existeUsuario = await Usuario.findOne({ email });

    if(existeUsuario){
        return res.status(400).json({msg: "El usuario ya está registrado"})
    }

    const usuario = new Usuario(req.body)
    try {        
        await usuario.save()
        res.json({msg:"Usuario creado exitosamente"})
    } catch (error) {
        console.log(error)
    }

}
