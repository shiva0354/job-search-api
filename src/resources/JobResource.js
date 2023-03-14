const handle = (job) => {
    return {
        _id: job._id,
        companyId: job.companyId,
        industry: job.industry,
        title: job.title
    }
}

export const make = (job) => {
    return handle(job)
}

export const collection = (jobs) => {
    return jobs.map((job) => {
        return handle(job)
    })
}
