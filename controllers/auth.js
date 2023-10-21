const userModel = require('../models/User')
const bcrypt = require('bcryptjs')
require('dotenv').config();

const login = async(req, res) => {
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