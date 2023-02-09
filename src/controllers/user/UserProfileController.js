import * as ApiResponse from '../../library/ApiResponse.js'
import * as Cache from '../../library/Cache.js'
import User from '../../models/User.js'

export const show = async (req, res) => {
    try {
        const userId = req.user.id

        let user = await Cache.get(`user_${userId}`)

        if (!user) {
            user = await User.findById(userId)

            await Cache.set(`user_${userId}`, user, 60 * 60)
        }

        return ApiResponse.success(res, user)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.user.id

        const { name, email, mobile, gender } = req.body

        let user = await User.findOne({ email: email, _id: { $ne: userId } })
        if (user) return ApiResponse.failed(res, 'Email already in use.')

        user = await User.findOne({ email: mobile, _id: { $ne: userId } })
        if (user) return ApiResponse.failed(res, 'Mobile already in use.')

        await User.findByIdAndUpdate(userId, {
            name,
            email,
            mobile,
            gender
        })

        await Cache.forget(`user_${userId}`)

        return ApiResponse.success(res, null, 'Profile updated successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id

        await User.findByIdAndUpdate(userId, {
            profilePicture: req.file.filename
        })

        await Cache.forget(`user_${userId}`)
        return ApiResponse.success(
            res,
            null,
            'Profile picture updated successfully.'
        )
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const uploadResume = async (req, res) => {
    try {
        const userId = req.user.id

        await User.findByIdAndUpdate(userId, {
            resumePath: req.file.filename
        })

        await Cache.forget(`user_${userId}`)
        
        return ApiResponse.success(res, null, 'Resume uploaded successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const downloadResume = async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId)
    const file = `${__dirname}/public/assets/${user.resumePath}`
    return res.download(file)
}
