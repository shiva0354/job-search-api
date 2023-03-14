import { appConfig } from '../config/AppConfig.js'

const handle = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        education: user.education,
        jobs: user.jobs,
        internship: user.internship,
        trainings: user.trainings,
        projects: user.projects,
        skills: user.skills,
        portfolio: user.portfolio,
        accomplishments: user.accomplishments,
        profilePicture: user.profilePicture
            ? appConfig.app_url + '/' + user.profilePicture
            : ''
    }
}

export const make = (user) => {
    return handle(user)
}

export const collection = (users) => {
    return users.map((user) => {
        return handle(user)
    })
}
