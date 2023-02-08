import redis from '../database/redis.js'
import { redisConfig } from '../config/AppConfig.js'

export const get = async (key) => {
    key = redisConfig.prefix + key
    console.log(key);
    return await redis.get(key)
}

export const set = async (key, value, time = null) => {
    key = redisConfig.prefix + key
    await redis.set(key, JSON.stringify(value), {
        EX: time ?? 180,
        NX: true
    })
}
