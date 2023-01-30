import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 4,
            max: 50
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
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'transgender', 'other']
        },
        profilePicture: String,
        location: String,
        education: {
            type: Array,
            default: []
        },
        jobs: {
            type: Array,
            default: []
        },
        internship: {
            type: Array,
            default: []
        },
        trainings: {
            type: Array,
            default: []
        },
        projects: {
            type: Array,
            default: []
        },
        skills: {
            type: Array,
            default: []
        },
        portfolio: {
            type: Array,
            default: []
        },
        accomplishments: {
            type: Array,
            default: []
        },
        applications: {
            type: Array
        },
        resumePath: String
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
