import jwt from 'jsonwebtoken'

const generarJWT = (id, nombre) => {
    return jwt.sign({id, nombre}, process.env.JWT_SECRET, {expiresIn: "8h"})
}

export default generarJWT