import mongoose from 'mongoose'

const JobApplicationSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userName: String,
        userEmail: String,
        userMobile: Number,
        jobId: {
            type: String,
            required: true
        },
        jobTitle: String,
        questions: {
            type: Array
        },
        isAccepted: Boolean
    },
    { timestamps: true }
)

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema)

export default JobApplication
