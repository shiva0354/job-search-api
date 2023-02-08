import nodemailer from 'nodemailer'
import { mailConfig } from '../config/AppConfig.js'

export const mail = () =>
    nodemailer.createTransport({
        // host: mailConfig.host,
        port: mailConfig.port
        // secure: mailConfig.encryption,
        // // ignoreTLS: false,
        // auth: {
        //     user: mailConfig.username,
        //     pass: mailConfig.password
        // },
        // tls: {
        //     // do not fail on invalid certs
        //     rejectUnauthorized: false
        // }
    })
