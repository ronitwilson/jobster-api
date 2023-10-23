const userModel = require('../models/User')
require('dotenv').config();
const UnAuthError = require('../errors/unauthenticated')

const login = async(req, res) => {
    console.log("reach login")
    const {email, password} = req.body
    if (!email | ! password) {
        const unauthError = new UnAuthError()
        throw unauthError  
    }
    const user = await userModel.findOne({email:email})
    if (user === null) {
        throw unauthError
    }
    res.status(200).json({msg: "login success"})
}

const register = async(req, res) => {
    const {name, email, password} = req.body
    if (! name || ! email) {
        res.status(403).json({msg: "no name or email"})
        return
    }
    if (! password) {
        res.status(403).json({msg: "no password"})
        return
    }
    let tempUser = {name, email, password}
    console.log("at user create")
    const userEntry = await userModel.create(tempUser)
    token = userEntry.createJWT()
    res.status(200).json({msg: `register success`, token, user: {name : userEntry.getName()}})
}

module.exports = {
    login,
    register
}