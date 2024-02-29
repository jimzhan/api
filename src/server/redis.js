import config from 'config'
import Redis from 'ioredis'
import RedisStore from '@mgcrea/fastify-session-redis-store'

export const redis = new Redis(config.redis)

export const store = new RedisStore({ client: redis, ttl: config.session.cookie.maxAge })
