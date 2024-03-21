import config from 'config'
import node from './server/node.js'
import routes from './apps/index.js'

const server = await node(routes)
server.listen({
  host: config.host,
  port: config.port
})
