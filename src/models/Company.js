import mongoose from 'mongoose'
import mongoosepaginate from 'mongoose-paginate'

const CompanySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 5,
            max: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 5,
            max: 50
        },
        mobile: {
            type: Number,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        industry: String,
        logo: String,
        location: String,
        about: String
    },
    { timestamps: true }
)

const Company = mongoose.model('Company', CompanySchema)
export default Company
