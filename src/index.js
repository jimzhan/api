import config from 'config'
import server from './core/server.js'
import routes from './apps/index.js'

server.register(routes)

server.listen({
  host: config.host,
  port: config.port
})
