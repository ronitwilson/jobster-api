const express = require('express')
const router = express.Router()
const jobCon = require('../controllers/jobs')

router.route('/').get(jobCon.getalljobs)
router.route('/:id').get(jobCon.getJob).post(jobCon.createJob).delete(jobCon.deleteJob).patch(jobCon.updateJob)

module.exports = router