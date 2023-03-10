import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Company from '../../models/Company.js'
import * as ApiResponse from '../../library/ApiResponse.js'
import { appConfig } from '../../config/AppConfig.js'
import { mail } from '../../library/Mail.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const company = await Company.findOne({ email: email })

        if (!company) return ApiResponse.failed(res, 'Wrong username.')

        const isPasswordMatched = bcrypt.compareSync(password, company.password)

        if (!isPasswordMatched) return ApiResponse.failed(res, 'Wrong password')

        const token = jwt.sign(
            { id: company._id, type: 'company' },
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
        const { name, email, mobile, password, logo, location, about } =
            req.body
        console.log(req.body)

        let company = await Company.findOne({ email: email })
        if (company) return ApiResponse.failed(res, 'Email already in use.')

        company = await Company.findOne({ mobile: mobile })
        if (company) return ApiResponse.failed(res, 'Mobile already in use.')

        const hashPassword = bcrypt.hashSync(password, 10)

        company = await Company.create({
            name: name,
            email: email,
            mobile: mobile,
            password: hashPassword,
            logo: req.file ? req.file.filename : '', //use multer
            location: location ?? '',
            about: about ?? ''
        })

        const { response } = await mail.sendMail({
            from: `<${mailConfig.mail_from_name}> <${mailConfig.mail_from_address}>`,
            to: company.email,
            subject: 'Regisration Successfull.',
            html: `<b>Welcome ${company.name},</b>
            Your registration on Job Search portal has been done successfully.
            Now you are ready to post job listing.
            
            Warm Regards,
            Team Job Search Portal`
        })

        console.log(response)

        return ApiResponse.success(res, null, 'Registration successfull.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const changePassword = async (req, res) => {
    try {
        const companyId = req.company.id
        const { password } = req.body

        const hasPassword = bcrypt.hashSync(password, 10)

        await Company.findByIdAndUpdate(companyId, {
            password: hasPassword
        })

        return ApiResponse.success(res, null, 'Password changed successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
