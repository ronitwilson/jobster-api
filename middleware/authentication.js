const BadReqError = require('../errors/bad-request')
const jwt = require("jsonwebtoken")
const UnAuthError = require("../errors/unauthenticated")


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || ! authHeader.startsWith('Bearer')){
        const badReqError = new BadReqError("no token provided")
        throw badReqError
    }
    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch {
        unAuthError = new UnAuthError("not valid token")
        throw unAuthError
    }
    const {username, id} = jwt.decode(token)

    req.user = {id, username}
    next()
}

module.exports = authMiddleware