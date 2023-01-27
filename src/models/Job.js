import mongoose from 'mongoose'

const JobSchema = mongoose.Schema(
    {
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
        Requirements: {
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
            enum: ['pending', 'published', 'rejected']
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        applications: {
            type: Array
        }
    },
    { timestamps: true }
)

const Job = mongoose.model('Job', JobSchema)
export default Job
