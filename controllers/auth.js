const userModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const login = async(req, res) => {
    res.status(200).json({msg: "login success"})
}

const register = async(req, res) => {
    // console.log(req.body)
    const {name, email, password} = req.body
    if (! name || ! email) {
        res.status(403).json({msg: "no name or email"})
        return
    }
    if (! password) {
        res.status(403).json({msg: "no password"})
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    let tempUser = {name, email, password:hashedPassword}
    // console.log(tempUser)
    const userEntry = await userModel.create(tempUser)
    console.log(userEntry.name)
    console.log(userEntry._id)
    console.log(process.env.JWT_SECRET)
    token = jwt.sign({userId: userEntry._id, name: userEntry.getName()}, process.env.JWT_SECRET, {expiresIn: '30d'});
    console.log("token")
    console.log(token)
    res.status(200).json({msg: `register success`, token, user: {name : userEntry.getName()}})
}

module.exports = {
    login,
    register
}