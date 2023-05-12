const handle = (job) => {
    return {
        _id: job._id,
        companyId: job.companyId,
        industry: job.industry,
        title: job.title,
        location: job.location,
        companyLogo: job.companyLogo,
        salary: job.salary,
        skillsReruired: job.skillsReruired,
        lastDateToApply: job.lastDateToApply,
        companyName:job.companyName
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
