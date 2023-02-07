import * as Apiresponse from '../../library/Apiresponse.js'
import Company from '../../models/Company.js'
import { CompanyProfile } from '../../resources/CompanyResource.js'

export const show = async (req, res) => {
    try {
        const companyId = req.company.id
        const company = await Company.findById(companyId)
        //TODO implement caching
        return Apiresponse.success(res, CompanyProfile(company))
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const companyId = req.company.id
        const { name, email, mobile, about, location } = req.body

        const company = await Company.findByIdAndUpdate(companyId, {
            name,
            email,
            mobile,
            location,
            about
        })

        return Apiresponse.success(res, company, 'Updated successfully.')
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const uploadLogo = async (req, res) => {
    try {
        const companyId = req.company.id

        const company = await Company.findByIdAndUpdate(companyId, {
            logo: req.file.filename
        })

        return Apiresponse.success(res, company, 'Logo Uploaded successfully.')
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}
