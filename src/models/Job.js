import mongoose from 'mongoose'

const JobSchema = mongoose.Schema(
    {
        companyId: String,
        industry: String,
        title: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        location: String,
        aboutCompany: String,
        companyLogo: String,
        keyResponsibities: {
            type: String,
            required: true
        },
        requirements: {
            type: String,
            required: true
        },
        skillsRequired: {
            type: Array
        },
        salary: Number,
        numberOfOpenings: Number,
        lastDateToApply: Date,
        status: {
            type: String,
            enum: ['pending', 'published', 'rejected'],
            default: 'pending'
        }
    },
    { timestamps: true }
)

const Job = mongoose.model('Job', JobSchema)
export default Job
