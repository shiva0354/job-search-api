import * as Apiresponse from '../../library/Apiresponse.js'
import User from '../../models/User.js'

export const show = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        return Apiresponse.success(res, user)
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByIdAndUpdate(userId, {
            //data to be updated
        })

        return Apiresponse.success(res, user)
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByIdAndUpdate(userId, {
            profilePicture: req.file.filename
        })

        return Apiresponse.success(res, user)
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const uploadResume = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findByIdAndUpdate(userId, {
            resumePath: req.file.filename
        })

        return Apiresponse.success(res, user)
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const downloadResume = async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId)
    const file = `${__dirname}/public/assets/${user.resumePath}`
    return res.download(file)
}
