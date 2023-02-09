import * as ApiResponse from '../../library/ApiResponse.js'
import * as Cache from '../../library/Cache.js'
import Job from '../../models/Job.js'
import JobApplication from '../../models/JobApplication.js'
import User from '../../models/User.js'

export const index = async (req, res) => {
    try {
        const userId = req.user.id

        let applications = await Cache.get(`user_applications_${userId}`)

        if (!applications) {
            applications = await JobApplication.find({ userId: userId })

            await Cache.get(
                `user_applications_${userId}`,
                applications,
                60 * 60
            )
        }

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
        const user = await User.findById(userId)

        const application = await JobApplication.find({
            userId: userId,
            jobId: jobId,
            $or: [{ status: 'pending' }, { status: 'accepted' }]
        })

        if (application) {
            return ApiResponse.failed(res, 'You already applied for this job.')
        }

        if (!job) return ApiResponse.notfound(res)

        await JobApplication.create({
            userId,
            jobId,
            userName: user.name,
            userEmail: user.email,
            userMobile: user.mobile,
            jobTitle: job.title,
            questions
        })

        await Cache.forget(`user_applications_${userId}`)
        await Cache.forget(`job_applications_${jobId}`)

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

        if (!application)
            return ApiResponse.forbidden(res, 'Job application not found.')

        if (application.userId != userId)
            return ApiResponse.forbidden(res, 'You are not authorised.')

        if (application.status === 'accepted')
            return ApiResponse.failed(
                res,
                "Application accepted by the company, so it can't be cancelled."
            )

        application.status = 'cancelled'
        application.save()

        await Cache.forget(`user_applications_${userId}`)
        await Cache.forget(`job_applications_${application.jobId}`)

        return ApiResponse.success(
            res,
            null,
            'Job application cancelled successfully.'
        )
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
