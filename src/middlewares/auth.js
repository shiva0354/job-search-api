import jwt from 'jsonwebtoken'
import { appConfig } from '../config/AppConfig'
import * as apiresponse from '../library/Apiresponse.js'

export const authEmployer = async (req, res, next) => {
    try {
        const verified = verifyToken(req, res)

        if (verified.type != 'employer')
            return apiresponse.forbidden(res, 'Access Denied')

        req.employer = verified
        next()
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

export const authUser = async (req, res, next) => {
    try {
        const verified = verifyToken(req, res)

        if (verified.type != 'user')
            return apiresponse.forbidden(res, 'Access Denied')

        req.user = verified
        next()
    } catch (error) {
        return apiresponse.exception(res, error)
    }
}

const verifyToken = async (req, res) => {
    let token = req.headers['Authorization']

    if (!token) return apiresponse.forbidden(res, 'Access denied.')

    if (token.startsWith('Bearer ')) token.splice(7, token.length).trimLeft()
    const verified = jwt.verify(token, appConfig.jwt_secret)
    return verified
}
