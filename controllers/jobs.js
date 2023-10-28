const jobModel = require('../models/Job')
const createJob = async(req, res) => {
    req.body.createdBy = req.user.id
    console.log("createJob")
    console.log(req.user.id)
    const job = await jobModel.create(req.body)
    res.status(200).json({msg: "create Job", job})
}

const getalljobs = async(req, res) => {
    res.status(200).json({msg: "getalljobs"})
}

const deleteJob = async(req, res) => {
    res.status(200).json({msg: "deleteJob"})
}

const getJob = async(req, res) => {
    res.status(200).json({msg: "getJob"})
}

const updateJob = async(req, res) => {
    res.status(200).json({msg: "updateJob"})
}

module.exports = {
    createJob,
    getalljobs,
    deleteJob,
    getJob,
    updateJob
}