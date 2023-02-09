import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import * as ApiResponse from '../../library/ApiResponse.js'
import { appConfig, mailConfig } from '../../config/AppConfig.js'
import { mail } from '../../library/Mail.js'

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
        if (user) return ApiResponse.failed(res, 'Email already in use.')

        user = await User.findOne({ email: mobile })
        if (user) return ApiResponse.failed(res, 'Mobile already in use.')

        const hashPassword = bcrypt.hashSync(password, 10)

        await User.create({
            name,
            email,
            mobile,
            gender,
            password: hashPassword
        })

        const { response } = await mail.sendMail({
            from: `<${mailConfig.mail_from_name}> <${mailConfig.mail_from_address}>`,
            to: user.email,
            subject: 'Regisration Successfull.',
            html: `<b>Welcome ${company.name},</b>
            Your registration on Job Search portal has been done successfully.
            Now you are ready to get your job.
            
            Warm Regards,
            Team Job Search Portal`
        })

        return ApiResponse.success(res, null, 'Registration successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id
        const { password } = req.body

        const hashPassword = bcrypt.hashSync(password, 10)

        const user = await User.findById(userId)

        user.password = hashPassword
        await user.save()

        const { response } = await mail.sendMail({
            from: `<${mailConfig.mail_from_name}> <${mailConfig.mail_from_address}>`,
            to: user.email,
            subject: 'IndiCart-Email-Conformation',
            html: `Your password has been chnaged`
        })

        console.log(response)

        return ApiResponse.success(res, null, 'Password changed successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
