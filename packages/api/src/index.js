import config from 'config'
import server from './server.js'

server.listen({
  host: config.get('host'),
  port: config.get('port')
})
