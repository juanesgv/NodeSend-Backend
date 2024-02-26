import mongoose from "mongoose";

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

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario