import config from 'config'
import { nanoid } from 'nanoid'
import Fastify from 'fastify'
import Cookie from '@fastify/cookie'
import Session from '@fastify/session'
import UnderPressure from '@fastify/under-pressure'

import setupGracefulShutdown from './shutdown.js'
import { store } from './redis.js'
import { swaggerize } from './plugins/swagger/swagger.js'

export default async (routes) => {
  const server = Fastify({
    logger: true,
    requestIdLogLabel: 'traceId',
    genReqId: (request) => request.headers['x-trace-id'] || nanoid()
  })

  swaggerize(server)
  server.register(Cookie)
  server.register(Session, Object.assign(config.session, { store }))
  server.register(UnderPressure, {
    async healthCheck() {
      // @TODO: Add database connection check
      return true
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/status',
    healthCheckInterval: 5000
  })

  server.register(routes)
  setupGracefulShutdown(server, 'SIGTERM', 'SIGINT')

  await server.ready()
  server.swagger()

  return server
}
