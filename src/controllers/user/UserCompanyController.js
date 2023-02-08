import * as ApiResponse from '../../library/ApiResponse.js'
import Company from '../../models/Company.js'
import Job from '../../models/Job.js'

export const viewCompany = async (req, res) => {
    try {
        const { companyId } = req.params

        const company = await Company.findById(companyId)

        //TODO implement cache
        return ApiResponse.success(res, company)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewCompanyJobs = async (req, res) => {
    try {
        const { companyId } = req.params

        const company = await Company.findById(companyId)

        if (!company) return ApiResponse.notfound(res, 'Company Not Found')

        const jobs = await Job.find({ companyId: companyId })

        //TODO implement cache
        return ApiResponse.success(res, jobs)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
