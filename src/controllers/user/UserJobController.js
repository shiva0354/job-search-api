import * as ApiResponse from '../../library/ApiResponse.js'
import Job from '../../models/Job.js'
import * as Cache from '../../library/Cache.js'

export const jobList = async (req, res) => {
    try {
        const { industry, salary, experience } = req.query

        let jobs = await Cache.get('jobs')
        console.log(jobs)

        if (!jobs) {
            jobs = await Job.find({
                status: 'published'
            }).sort({ createdAt: -1 })

            await Cache.set('jobs', jobs)
        }

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

        //TODO implement cache
        return ApiResponse.success(res, job)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
