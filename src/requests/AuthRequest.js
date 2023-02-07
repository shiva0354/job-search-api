import { validate } from './validator.js'

export const login = (req, res, next) => {
    const rules = {
        email: 'required|string|email|max:100',
        password: 'required|string|min:6'
    }

    validate(req, res, next, rules)
}

export const changePassword = (req, res, next) => {
    const rules = {
        password: 'required|string|min:6|confirmed'
    }
    validate(req, res, next, rules)
}
