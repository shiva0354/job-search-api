import Job from "../../models/Job.js"

export const index = async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 })
}

export const store = async (req, res) => { }

export const update = async (req, res) => {
    const { jobId } = req.params
}

export const show = async (req, res) => {
    const { jobId } = req.params
}

export const destroy = async (req, res) => {
    const { jobId } = req.params
}
