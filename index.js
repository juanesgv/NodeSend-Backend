import express from 'express'

//creador servidor
const app = express()

console.log("comenzando Node Send")

//puerto de la app
const port = process.env.PORT || 4000

//Arrancar la app
app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})