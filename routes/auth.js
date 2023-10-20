const express = require('express')
const router = express.Router()


router.route("/login").get((req, res)=> {res.send("login route")})
router.route("/register").post((req, res)=> {res.send("register route")})

module.exports = router