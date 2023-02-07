import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import * as ApiResponse from '../../library/ApiResponse.js'
import { appConfig } from '../../config/AppConfig.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) return ApiResponse.notfound(res, 'User not found.')

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) return ApiResponse.failed(res, 'Wrong password')

        const token = jwt.sign(
            { id: user._id, type: 'user' },
            appConfig.jwt_secret,
            {
                expiresIn: '2h'
            }
        )

        return ApiResponse.success(res, { token: token })
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, mobile, password, gender } = req.body

        let user = await User.findOne({ email: email })
        if (user) return ApiResponse.failed(res, 'Emial already in use.')

        user = await User.findOne({ email: mobile })
        if (user) return ApiResponse.failed(res, 'Mobile already in use.')

        const hashPassword = bcrypt.hashSync(password, 10)

        user = await User.create({
            name,
            email,
            mobile,
            gender,
            password: hashPassword
        })

        return ApiResponse.success(res, user, 'Registration successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const changePassword = async (req, res) => {
    try {
        const { userId } = req.params
        const { password } = req.body

        const hasPassword = bcrypt.hashSync(password, 10)

        await User.findByIdAndUpdate(userId, {
            password: hasPassword
        })

        return ApiResponse.success(res, null, 'Password changed successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
