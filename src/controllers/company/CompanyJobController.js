import * as ApiResponse from '../../library/ApiResponse.js'
import Company from '../../models/Company.js'
import Job from '../../models/Job.js'
import * as JobResource from '../../resources/JobResource.js'

export const index = async (req, res) => {
    try {
        const companyId = req.company.id

        let jobs = await Cache.length(`jobs_${companyId}`)

        if (!jobs) {
            jobs = await Job.find({ companyId: companyId }).sort({
                createdAt: -1
            })

            await Cache.set(`jobs_${companyId}`, jobs, 60 * 60)
        }

        return ApiResponse.success(res, JobResource.collection(jobs))
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const store = async (req, res) => {
    try {
        const companyId = req.company.id

        const {
            title,
            location,
            keyResponsibities,
            requirements,
            skillsRequired,
            salary,
            numberOfOpenings,
            lastDateToApply
        } = req.body

        const company = await Company.findById(companyId)

        await Job.create({
            companyId: companyId,
            industry: company.industry,
            title,
            location: location ?? company.location,
            aboutCompany: company.about,
            companyLogo: company.logo,
            keyResponsibities,
            requirements,
            skillsRequired,
            salary,
            numberOfOpenings,
            lastDateToApply
        })

        await Cache.forget(`jobs_${companyId}`)
        await Cache.forget(`jobs`)

        return ApiResponse.success(res, null, 'Job created successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        const {
            keyResponsibities,
            requirements,
            skillsRequired,
            salary,
            numberOfOpenings,
            lastDateToApply
        } = req.body

        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res, 'Job not found.')

        if (job.companyId !== companyId)
            return ApiResponse.forbidden(res, 'Not authorised to edit.')

        await job.update({
            keyResponsibities,
            requirements,
            skillsRequired,
            salary,
            numberOfOpenings,
            lastDateToApply
        })

        await Cache.forget(`jobs_${companyId}`)
        await Cache.forget(`jobs`)
        await Cache.forget(`job_${jobId}`)

        return ApiResponse.success(res, null, 'Job updated successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const show = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        let job = Cache.get(`job_${jobId}`)

        if (!job) {
            job = await Job.findById(jobId)

            await Cache.set(`job_${jobId}`, job, 60 * 60)
        }

        if (!job) return ApiResponse.notfound(res, 'Job not found.')

        if (job.companyId !== companyId)
            return ApiResponse.forbidden(res, 'Not authorised to view.')

        return ApiResponse.success(res, job)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const destroy = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res, 'Job not found.')

        if (job.companyId !== companyId)
            return ApiResponse.forbidden(res, 'Not authorised to view.')

        await job.delete()

        await Cache.forget(`jobs_${companyId}`)
        await Cache.forget(`jobs`)
        await Cache.forget(`job_${jobId}`)

        return ApiResponse.success(res, null, 'Job deleted successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
