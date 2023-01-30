import * as apiresponse from "../../library/Apiresponse"
import Company from "../../models/company.js"

export const show = async (req, res) => {
    try {
        const { companyId } = req.company.id
        const company = await Company.findById(companyId)
        //TODO implement caching
        return apiresponse.success(res, company)
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const { companyId } = req.company.id
        const { name, email, mobile, about, location } = req.body

        const company = await Company.findByIdAndUpdate(
            companyId,
            {
                name, email, mobile, location, about
            }
        )

        return apiresponse.success(res, company, 'Updated successfully.')
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const uploadLogo = async (req, res) => {
    try {
        const { companyId } = req.company.id

        const company = await Company.findByIdAndUpdate(
            companyId,
            {
                logo: ''//
            }
        )

        return apiresponse.success(res, company, 'Logo Uploaded successfully.')
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}
