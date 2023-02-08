import jwt from 'jsonwebtoken'
import { appConfig } from '../config/AppConfig.js'
import * as ApiResponse from '../library/ApiResponse.js'

export const authCompany = async (req, res, next) => {
    try {
        const verified = verifyToken(req)

        if (verified.type != 'company')
            return ApiResponse.forbidden(res, 'Access Denied')

        req.company = verified
        next()
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

export const authUser = async (req, res, next) => {
    try {
        const verified = await verifyToken(req)

        if (!verified || verified.type != 'user')
            return ApiResponse.forbidden(res, 'Access Denied')

        req.user = verified
        next()
    } catch (error) {
        return ApiResponse.exception(res, error)
    }
}

const verifyToken = (req) => {
    let token = req.headers['authorization']

    if (!token) return false

    if (token.startsWith('Bearer '))
        token = token.slice(7, token.length).trimLeft()

    return jwt.verify(token, appConfig.jwt_secret)
}
