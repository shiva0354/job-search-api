import jwt from 'jsonwebtoken'
import { appConfig } from '../config/AppConfig.js'
import * as Apiresponse from '../library/Apiresponse.js'

export const authCompany = async (req, res, next) => {
    try {
        const verified = verifyToken(req)

        if (verified.type != 'company')
            return Apiresponse.forbidden(res, 'Access Denied')

        req.company = verified
        next()
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

export const authUser = (req, res, next) => {
    try {
        const verified = verifyToken(req)

        if (!verified || verified.type != 'user')
            return Apiresponse.forbidden(res, 'Access Denied')

        req.user = verified
        next()
    } catch (error) {
        return Apiresponse.exception(res, error)
    }
}

const verifyToken = (req) => {
    let token = req.headers['authorization']

    if (!token) return false

    if (token.startsWith('Bearer '))
        token = token.slice(7, token.length).trimLeft()

    const verified = jwt.verify(token, appConfig.jwt_secret)

    return verified
}
