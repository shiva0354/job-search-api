import Job from '../../models/Job.js'
import User from '../../models/User.js'
import JobApplication from '../../models/JobApplication.js'
import * as ApiResponse from '../../library/Apiresponse.js'

export const index = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res, 'Job not found.')

        if (job.companyId !== companyId)
            return ApiResponse.forbidden(res, 'Not authorised to view.')

        const applications = await JobApplication.find({ jobId: jobId })

        return ApiResponse.success(res, applications)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewApplication = async (req, res) => {
    try {
        const companyId = req.company.id
        const { applicationId } = req.params

        const application = await JobApplication.findById(applicationId)

        if (companyId != application.companyId)
            return ApiResponse.forbidden(res, 'Not Authorised to see.')

        return ApiResponse.success(res, application)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const accepReject = async (req, res) => {
    try {
        const companyId = req.company.id
        const { applicationId } = req.params
        const { status } = req.body

        const application = await JobApplication.findById(applicationId)

        if (companyId != application.companyId)
            return ApiResponse.forbidden(res, 'Not Authorised to see.')

        if (application.isAccepted) application.isAccepted = false
        else application.isAccepted = true

        application.save()

        return ApiResponse.success(
            res,
            application,
            'Status changed successfully.'
        )
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewCandidate = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)

        return ApiResponse.success(res, user)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
