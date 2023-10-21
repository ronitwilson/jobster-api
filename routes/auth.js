const express = require('express')
const router = express.Router()
const authCon = require('../controllers/auth')


router.route("/login").post(authCon.login)
router.route("/register").post(authCon.register)

module.exports = router