import Job from '../../models/Job.js'
import User from '../../models/User.js'
import JobApplication from '../../models/JobApplication.js'
import * as ApiResponse from '../../library/ApiResponse.js'
import * as Cache from '../../library/Cache.js'
import { mail } from '../../library/Mail.js'

export const index = async (req, res) => {
    try {
        const companyId = req.company.id
        const { jobId } = req.params

        const job = await Job.findById(jobId)

        if (!job) return ApiResponse.notfound(res, 'Job not found.')

        if (job.companyId !== companyId)
            return ApiResponse.forbidden(res, 'Not authorised to view.')

        let applications = await Cache.get(`job_applications_${jobId}`)

        if (!applications) {
            applications = await JobApplication.find({ jobId: jobId })

            await Cache.set(`job_applications_${jobId}`, applications, 60 * 60)
        }

        return ApiResponse.success(res, applications)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewApplication = async (req, res) => {
    try {
        const companyId = req.company.id
        const { applicationId } = req.params

        let application = await Cache.get(`application_${applicationId}`)

        if (!application) {
            application = await JobApplication.findById(applicationId)

            await Cache.set(
                `application_${applicationId}`,
                application,
                60 * 60
            )
        }

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

        if (application.status === status)
            return ApiResponse.failed(res, `Application already ${status}.`)
        else application.status = status

        application.save()

        const { response } = await mail.sendMail({
            from: `<${mailConfig.mail_from_name}> <${mailConfig.mail_from_address}>`,
            to: application.userEmail,
            subject: `Status of Job Application - ${application.jobTitle} .`,
            html: `<b>Hi ${application.userName},</b>
            Your job application has been <b>${status}</b>.
            
            Warm Regards,
            Team Job Search Portal`
        })

        await Cache.forget(`application_${applicationId}`)
        await Cache.forget(`job_applications_${application.jobId}`)

        console.log(response)

        return ApiResponse.success(res, null, 'Status changed successfully.')
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewCandidate = async (req, res) => {
    try {
        const { userId } = req.params

        let user = await Cache.get(`user_${userId}`)

        if (!user) {
            user = await User.findById(userId)
            await Cache.set(`user_${userId}`, user, 60 * 60 * 60)
        }

        return ApiResponse.success(res, user)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
