import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioSchema = mongoose.Schema({
    email : {
        type: String,
        require : true,
        trim: true,
        unique: true,
        lowercase: true
    },
    nombre : {
        type: String,
        require : true,
        trim: true
    },
    password: {
        type: String,
        require : true,
        trim: true
    }
})

//Hasheo al password
usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){ //Verifica si la contraseña ha sido hasheada, si ya ha sido modificada no se ejecuta el hasheo
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario