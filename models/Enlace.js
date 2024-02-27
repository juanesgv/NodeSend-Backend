import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const enlaceSchema = mongoose.Schema({
    url : {
        type : String,
        require : true
    },
    nombre: {
        type : String,
        require : true
    },
    nombre_original : {
        type : String,
        require : true
    },
    descargas : {
        type : Number,
        default : 1
    },
    autor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario',
        default : null
    },
    password : {
        type : String,
        default : null
    },
    creado : {
        type : Date,
        default : Date.now()
    }
})

//Hasheo al password
enlaceSchema.pre('save', async function(next){
    if(!this.isModified('password')){ //Verifica si la contraseña ha sido hasheada, si ya ha sido modificada no se ejecuta el hasheo
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const Enlace = mongoose.model("Enlace", enlaceSchema)

export default Enlace
