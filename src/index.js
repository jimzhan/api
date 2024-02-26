import config from 'config'
import server from './core/server.js'
import auth from './apps/auth/index.js'

server.register(auth)

server.listen({
  host: config.host,
  port: config.port,
})
