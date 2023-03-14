import dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
    app_name: process.env.APP_NAME || 'Job Search',
    jwt_secret: process.env.JWT_SECRET,
    app_url:process.env.APP_URL
}

export const dbConfig = {
    mongo_url: process.env.MONGO_URL
}

export const mailConfig = {
    transport: 'smtp',
    host: process.env.MAIL_HOST || 'smtp.mailgun.org',
    port: process.env.MAIL_PORT || 587,
    encryption: process.env.MAIL_ENCRYPTION || 'tls',
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    timeout: null,
    auth_mode: null,
    mail_from_address: process.env.MAIL_FROM_ADDRESS,
    mail_from_name: process.env.MAIL_FROM_NAME
}

export const redisConfig = {
    url: process.env.REDIS_URL,
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD || null,
    port: process.env.REDIS_PORT || '6379',
    database: process.env.REDIS_DB || '0',
    prefix: process.env.REDIS_PREFIX || process.env.APP_NAME
}
