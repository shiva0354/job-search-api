import * as ApiResponse from '../../library/ApiResponse.js'
import Job from '../../models/Job.js'
import JobApplication from '../../models/JobApplication.js'

export const index = async (req, res) => {
    try {
        const userId = req.user.id

        const applications = await JobApplication.find({ userId: userId })

        return ApiResponse.success(res, applications)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const apply = async (req, res) => {
    try {
        const userId = req.user.id
        const { jobId } = req.params

        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res)

        await JobApplication.create({
            userId,
            jobId
        })

        return ApiResponse.success(
            res,
            null,
            'Application submitted successfully.'
        )
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const cancelApplication = async (req, res) => {
    try {
        const userId = req.user.id
        const { applicationId } = req.params

        const application = await JobApplication.findById(applicationId)

        if (application.userId != userId)
            return ApiResponse.forbidden(res, 'You are not authorised.')

        application.status = 'cancelled'
        application.save()

        return ApiResponse.success(res, application)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
