import { appConfig } from '../config/AppConfig.js'

export const make = (user) => {
    return handle(user)
}

export const collection = (users) => {
    return users.map((user) => {
        return handle(user)
    })
}

const handle = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        profilePicture: user.profilePicture
            ? appConfig.app_url + '/' + user.profilePicture
            : ''
    }
}
