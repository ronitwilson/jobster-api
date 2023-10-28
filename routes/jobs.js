const express = require('express')
const router = express.Router()
const jobCon = require('../controllers/jobs')

router.route('/').get(jobCon.getalljobs).post(jobCon.createJob)
router.route('/:id').get(jobCon.getJob).delete(jobCon.deleteJob).patch(jobCon.updateJob)

module.exports = router