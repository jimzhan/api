import config from 'config'
import server from './lib/server.js'

server.listen({
  host: config.host,
  port: config.port,
})
