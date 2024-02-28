import config from 'config'
import Redis from 'ioredis'
import RedisStore from 'connect-redis'

const prefix = `[${process.env.npm_package_name || 'service'}]`

export const redis = new Redis(config.redis)

export const store = new RedisStore({
  prefix,
  client: redis
})
