let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')


let hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let comparePassword = async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}

let createToken = async ({ email, name }) => {
    let token = await jwt.sign(
        { email, name },
        process.env.JWT_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token
}

let decodetoken = (token) => {
    return jwt.decode(token)
}

let validate = async (req, res, next) => {
    let token = req?.headers?.authorization?.split(" ")[1]
    if (token) {
        let { exp } = await decodetoken(token)
        if (((Math.round(+ new Date)) / 1000) < exp) {
            next()
        } else {
            res
                .status(401)
                .send({
                    message: "Token has been expired"
                })
        }
    } else {
        res
            .status(401)
            .send({
                message: "Token not found "
            })
    }
}
module.exports = { createToken, validate,hashPassword,comparePassword }