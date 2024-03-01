import config from 'config'
import { nanoid } from 'nanoid'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import session from '@mgcrea/fastify-session'
import pressure from '@fastify/under-pressure'
import swagger from '@fastify/swagger'
import apirefs from '@scalar/fastify-api-reference'

import { store } from './redis.js'
import setupGracefulShutdown from './shutdown.js'
import logger from '../core/winston.js'
import { onRequest, onResponse } from './hooks/context.js'

export default async (routes) => {
  const server = fastify({
    logger,
    disableRequestLogging: true,
    requestIdLogLabel: 'traceId',
    genReqId: (request) => request.headers['x-trace-id'] || nanoid()
  })
  setupGracefulShutdown(server, 'SIGTERM', 'SIGINT')

  server.register(cookie)
  server.register(session, Object.assign(config.session, { store }))
  server.register(pressure, {
    async healthCheck() {
      // @TODO: Add database connection check
      return true
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/status',
    healthCheckInterval: 5000
  })
  server.register(cors)
  server.register(helmet, {
    noCache: true,
    policy: 'same-origin',
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self' 'unsafe-inline'"]
      }
    }
  })
  server.register(swagger, {
    exposeRoute: true,
    openapi: {
      info: {
        title: config.api.title,
        version: config.api.version
      }
    }
  })
  server.register(apirefs, { routePrefix: '/docs' })
  // server hooks
  server.addHook('onRequest', onRequest)
  server.addHook('onResponse', onResponse)
  server.register(routes)

  await server.ready()

  return server
}
