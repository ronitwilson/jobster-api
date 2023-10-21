/*
name,
email,
password
lastName,
location,
*/

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    }, 
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'lastname',
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',    
    },
})

UserSchema.methods.getName = function () {
    // console.log("reaches the getname method")
    // console.log(this.name)
    // console.log(JSON)
    return this.name
}

UserSchema.methods.createJWT = function () {
    token = jwt.sign({userId: this._id, name: this.getName()}, process.env.JWT_SECRET, {expiresIn: '30d'});
    // console.log(token)}
    return token
}
module.exports = mongoose.model('User', UserSchema)