import bcrypt from 'bcrypt'
import jwt from 'jwt'
import Company from '../../models/company.js'
import * as apiresponse from '../../library/Apiresponse.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const company = await Company.findOne({ email: email })

        if (!company) return apiresponse.notfound(res, 'employer not found.')

        const isPasswordMatched = await bcrypt.compare(
            password,
            company.password
        )

        if (!isPasswordMatched) return apiresponse.failed(res, 'Wrong password')

        const token = jwt.sign(
            { id: user._id, type: 'company' },
            appConfig.jwt_secret,
            {
                expiresIn: '2h'
            }
        )
        return apiresponse.success(res, { token: token })
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        let company = await Company.findOne({ email: email })
        if (company) return apiresponse.failed(res, 'Emial already in use.')

        company = await Company.findOne({ email: mobile })
        if (company) return apiresponse.failed(res, 'Mobile already in use.')

        const hashPassword = bcrypt.hashSync(password, 10)

        company = await Company.create({})

        return apiresponse.success(res, company, 'Registration successfully.')
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const changePassword = async (req, res) => {
    try {
        const { companyId } = req.params
        const { password } = req.body

        const hasPassword = bcrypt.hashSync(password, 10)

        await Company.findByIdAndUpdate(companyId, {
            password: hasPassword
        })

        return apiresponse.success(res, null, 'Password changed successfully.')
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}
