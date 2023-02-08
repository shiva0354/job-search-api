import * as ApiResponse from '../../library/ApiResponse.js'
import Company from '../../models/Company.js'
import { CompanyProfile } from '../../resources/CompanyResource.js'

export const show = async (req, res) => {
    try {
        const companyId = req.company.id
        const company = await Company.findById(companyId)
        //TODO implement caching
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

        return ApiResponse.success(res, null, 'Profile updated successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const uploadLogo = async (req, res) => {
    try {
        const companyId = req.company.id

        const company = await Company.findByIdAndUpdate(companyId, {
            logo: req.file.filename
        })

        return ApiResponse.success(res, null, 'Logo Uploaded successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
