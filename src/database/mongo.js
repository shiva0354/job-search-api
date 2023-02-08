import mongoose from 'mongoose'
import { dbConfig } from '../config/AppConfig.js'

const connection = () => {
    try {
        // console.log(dbConfig.mongo_url)
        mongoose.set('strictQuery', false)
        mongoose.connect(dbConfig.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(`${error} did not connect`)
    }
}

export default connection
