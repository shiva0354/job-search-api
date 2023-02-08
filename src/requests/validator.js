import Validator from 'validatorjs'
import * as ApiResponse from '../library/ApiResponse.js'

export const validate = (req, res, next, rules, message = null) => {
    const validator = new Validator(req.body, rules, message)

    if (!validator.passes())
        return ApiResponse.invalid(res, 'Invalid Data', validator.errors.errors)

    next()
}
