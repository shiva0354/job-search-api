import dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
    app_name: process.env.APP_NAME,
    jwt_secret: process.env.JWT_SECRET
}

export const dbConfig = {
    mongo_url: process.env.MONGO_URL
}
