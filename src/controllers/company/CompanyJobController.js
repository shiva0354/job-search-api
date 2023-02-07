import * as ApiResponse from '../../library/Apiresponse.js'
import Job from '../../models/Job.js'

export const index = async (req, res) => {
    try {
        const companyId = req.company.id

        const jobs = await Job.find({ companyId: companyId }).sort({
            createdAt: -1
        })

        return ApiResponse.success(res, jobs)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const store = async (req, res) => {
    try {
        const companyId = req.company.id

        const { title } = req.body

        const job = await Job.create({
            companyId: companyId
        })

        return ApiResponse.success(res, job, 'Job created successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const update = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        const { title } = req.body

        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res, 'Job not found.')

        if (job.companyId !== companyId)
            return ApiResponse.forbidden(res, 'Not authorised to edit.')

        await job.update({
            //update data here
        })

        return ApiResponse.success(res, job, 'Job updated successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const show = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        const job = await Job.findById(jobId)

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

        return ApiResponse.success(res, null, 'Job deleted successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
