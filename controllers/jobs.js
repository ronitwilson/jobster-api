const createJob = async(req, res) => {
    res.status(200).json({msg: "create Job"})
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