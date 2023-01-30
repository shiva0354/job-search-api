import Job from '../../models/Job'

export const apply = async (req, res) => {
    try {
        const userId = req.user.id
        const { jobId } = req.params

        const company = await Job.findById(jobId)

        return ApiResponse.success(res, company)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const viewApplied = async (req, res) => {
    try {
        const userId = req.user.id
        const { jobId } = req.params

        const company = await Job.findById(jobId)

        return ApiResponse.success(res, company)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const cancelApplication = async (req, res) => {
    try {
        const userId = req.user.id
        const { jobId } = req.params

        const company = await Job.findById(jobId)

        return ApiResponse.success(res, company)
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}
