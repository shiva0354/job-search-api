import * as ApiResponse from '../../library/ApiResponse.js'
import Job from '../../models/Job.js'
import * as Cache from '../../library/Cache.js'
import * as JobResource from '../../resources/JobResource.js'

export const jobList = async (req, res) => {
    try {
        const { industry, salary, experience } = req.query

        let jobs = await Cache.get('jobs')
        console.log(jobs)

        if (!jobs) {
            let jobs = await Job.find({
                status: 'published'
            }).sort({ createdAt: -1 })

            await Cache.set('jobs', jobs)
        }

        return ApiResponse.success(
            res,
            JobResource.collection(JSON.parse(jobs))
        )
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewJob = async (req, res) => {
    try {
        const { jobId } = req.params

        let job = await Cache.get(`job_${jobId}`)

        if (!job) {
            job = await Job.findById(jobId)

            if (!job) return ApiResponse.notfound(res, 'No Job listing found.')
            else await Cache.get(`job_${jobId}`, job, 60 * 60)
        }

        return ApiResponse.success(res, JobResource.make(job))
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
