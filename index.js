import express from 'express'
import conectarDB from './config/db.js'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/usuarioRoutes.js'
import auth from './routes/auth.js'

//creador servidor
const app = express()
app.use(express.json())

dotenv.config() //Permite el llamado de las variables de entorno (.env)

//conectar a la bd
conectarDB()

//puerto de la app
const port = process.env.PORT || 4000

//creación de usuarios
app.use('/api/usuarios',usuarioRoutes )
app.use('/api/auth', auth )

//Arrancar la app
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})