import * as ApiResponse from '../../library/ApiResponse.js'
import * as Cache from '../../library/Cache.js'
import Company from '../../models/Company.js'
import Job from '../../models/Job.js'
import * as CompanyResource from '../../resources/CompanyResource.js'
import * as JobResource from '../../resources/JobResource.js'

export const viewCompany = async (req, res) => {
    try {
        const { companyId } = req.params

        let company = await Cache.get(`company_${companyId}`)

        if (!company) {
            company = await Company.findById(companyId)

            await Cache.set(`company_${companyId}`, company, 60 * 60)
        }

        return ApiResponse.success(res, CompanyResource.make(company))
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewCompanyJobs = async (req, res) => {
    try {
        const { companyId } = req.params

        const company = await Company.findById(companyId)

        if (!company) return ApiResponse.notfound(res, 'Company Not Found')

        let jobs = await Cache.get(`jobs_${companyId}`)

        if (!jobs) {
            jobs = await Job.find({ companyId: companyId })

            await Cache.set(`jobs_${companyId}`, jobs, 60 * 60)
        }

        return ApiResponse.success(res, JobResource.collection(jobs))
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
