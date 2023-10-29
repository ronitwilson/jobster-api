const jobModel = require('../models/Job')
const createJob = async(req, res) => {
    req.body.createdBy = req.user.id
    console.log("createJob")
    console.log(req.user.id)
    const job = await jobModel.create(req.body)
    res.status(200).json({msg: "create Job", job})
}

const getalljobs = async(req, res) => {
    console.log("getalljobs")
    console.log(req.user.id)
    const jobs = await jobModel.find({createdBy: req.user.id}).sort('createdAt')
    console.log(jobs)
    res.status(200).json({jobs})
}

const deleteJob = async(req, res) => {
    res.status(200).json({msg: "deleteJob"})
}

const getJob = async(req, res) => {
    const job = await jobModel.findOne({createdBy: req.user.id, _id: req.params.id})
    res.status(200).json({msg: "getJob", job})
}

const updateJob = async(req, res) => {
    if(! req.body.position && ! req.body.company){
        res.status(400).json({msg: "need company or position to update"})
    }
    const job = await jobModel.findOneAndUpdate({createdBy: req.user.id, _id: req.params.id},
         req.body,  { new: true, runValidators: true })
    if(job) {
        res.status(200).json({msg: "job updated"})
    }
    else {
        res.status(400).json({msg: "job not found"})
    }
    
}

module.exports = {
    createJob,
    getalljobs,
    deleteJob,
    getJob,
    updateJob
}