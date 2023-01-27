export const index = async (req, res) => {
    const { jobId } = req.params
}

export const accepReject = async (req, res) => {
    const { applicationId } = req.params
}

export const viewCandidate = (req, res) => {
    const { userId } = req.params
    //take out userid from applicationId
}
