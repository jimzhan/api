import config from 'config'
import passport from '@fastify/passport'

import server from './core/server.js'
import routes from './apps/index.js'
import AuthStrategy from './apps/auth/strategies/auth.db.strategy.js'

passport.use('db', AuthStrategy)

server.register(routes)

server.listen({
  host: config.host,
  port: config.port
})
