const mongoose = require('mongoose');

// company position status, createdBy, jobType, joblocation, 

const  JobSchema = new mongoose.Schema( {

    company: {
        type: String,
        required: [true, "must povide company name "]
    },
    position: {
        type: String,
        required:[true, "must porvide position"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "please provide the user"]
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time',
    },
    joblocation: {
        type: String,
        default: 'my city',
    },
},
{timestamps: true}
)
JobSchema.index(
    {company: 1, position:1},
    {unique: true}
    )
module.exports = mongoose.model('Job', JobSchema)