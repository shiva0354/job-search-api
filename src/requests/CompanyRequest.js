import { validate } from './validator.js'

export const register = (req, res, next) => {
    const rules = {
        name: 'required|string|min:10|max:150',
        email: 'required|string|email|min:4|max:100',
        mobile: 'required|numeric',
        password: 'required|string|min:6|max:50',
        about: 'string|min:30|max:1000',
        location: 'string|min:3|max:100'
    }

    validate(req, res, next, rules)
}

export const update = (req, res, next) => {
    const rules = {
        name: 'required|string|min:10|max:150',
        email: 'required|string|email|min:4|max:100',
        mobile: 'required|numeric',
        about: 'nullable|string|min:30|max:1000',
        location: 'nullable|string|min:3|max:100'
    }
}

export const uploadLogo = (req, res, next) => {
    const rules = {
        logo: 'required|'
    }

    validate(req, res, next, rules)
}
