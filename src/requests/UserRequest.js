import { validate } from './validator.js'

export const register = (req, res, next) => {
    const rules = {
        name: 'required|string|max:100',
        email: 'required|string|email|max:100',
        mobile: 'required|digits:10',
        password: 'required|string|min:6'
    }

    validate(req, res, next, rules)
}

export const profileUpdate = (req, res, next) => {
    const rules = {
        name: 'required|string|max:100',
        email: 'required|string|email|max:100',
        mobile: 'required|digits:10',
        password: 'required|string|min:6'
    }

    validate(req, res, next, rules)
}

export const uploadphoto = (req, res, next) => {
    const rules = {
        picture: 'required|'
    }

    validate(req, res, next, rules)
}

export const uploadResume = (req, res, next) => {
    const rules = {
        resume: 'required|'
    }

    validate(req, res, next, rules)
}
