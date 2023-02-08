import { createClient } from 'redis'
import { redisConfig } from '../config/AppConfig.js'

const redis = createClient({
    url: `redis://:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`
})

redis.connect()

redis.on('ready', () => console.log('Redis Client Connected'))
redis.on('error', (err) => console.log('Redis Client Error', err))

export default redis