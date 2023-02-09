import * as ApiResponse from '../../library/ApiResponse.js'
import * as Cache from '../../library/Cache.js'
import Company from '../../models/Company.js'
import { CompanyProfile } from '../../resources/CompanyResource.js'

export const show = async (req, res) => {
    try {
        const companyId = req.company.id

        let company = Cache.get(`company_${companyId}`)

        if (!company) {
            company = await Company.findById(companyId)

            await Cache.set(`company_${companyId}`, company, 60 * 60)
        }

        return ApiResponse.success(res, CompanyProfile(company))
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const companyId = req.company.id
        const { name, email, mobile, about, location } = req.body

        let company = await Company.findOne({
            email: email,
            _id: { $ne: companyId }
        })
        if (company) return ApiResponse.failed(res, 'Email already in use.')

        company = await Company.findOne({
            mobile: mobile,
            _id: { $ne: companyId }
        })

        if (company) return ApiResponse.failed(res, 'Mobile already in use.')

        await Company.findByIdAndUpdate(companyId, {
            name,
            email,
            mobile,
            location,
            about
        })

        await Cache.forget(`company_${companyId}`)

        return ApiResponse.success(res, null, 'Profile updated successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const uploadLogo = async (req, res) => {
    try {
        const companyId = req.company.id

        await Company.findByIdAndUpdate(companyId, {
            logo: req.file.filename
        })

        await Cache.forget(`company_${companyId}`)

        return ApiResponse.success(res, null, 'Logo Uploaded successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
