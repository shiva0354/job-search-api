import { validate } from './validator.js'

export const create = (req, res, next) => {
    const rules = {
        title: 'required|string|min:10|max:100',
        location: 'required|string|max:100',
        keyResponsibities: 'required|string|min:10|max:1000',
        requirements: 'required|string|min:10|max:1000',
        skillsRequired: 'required|string|min:10|max:1000',
        salary: 'required|numeric',
        numberOfOpenings: 'required|numeric',
        lastDateToApply: 'required|date'
    }

    validate(req, res, next, rules)
}
export const update = (req, res, next) => {
    const rules = {
        // title: 'required|string|min:10|max:100',
        // location: 'required|string|max:100',
        keyResponsibities: 'required|string|min:10|max:1000',
        requirements: 'required|string|min:10|max:1000',
        skillsRequired: 'required|string|min:10|max:1000',
        salary: 'required|numeric',
        numberOfOpenings: 'required|numeric',
        lastDateToApply: 'required|date'
    }

    validate(req, res, next, rules)
}
