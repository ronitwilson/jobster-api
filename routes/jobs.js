const express = require('express')
const router = express.Router()


router.route('/').get()
router.route('/static').get()

module.exports = router