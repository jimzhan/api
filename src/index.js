import config from 'config'
import bootstrap from './server/bootstrap.js'
import routes from './apps/index.js'

const server = await bootstrap(routes)
server.listen({ port: config.port, host: config.host })
