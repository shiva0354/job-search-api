import * as ApiResponse from '../../library/Apiresponse.js'
import Job from '../../models/Job.js'

export const jobList = async (req, res) => {
    try {
        const jobs = await Job.find({
            companyId: companyId,
            status: 'published'
        }).sort({ createdAt: -1 })

        return ApiResponse.success(res, jobs)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewJob = async (req, res) => {
    try {
        const { jobId } = req.params
        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res, 'No Job listing found.')

        return ApiResponse.success(res, job)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
