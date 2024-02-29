import config from 'config'
import { nanoid } from 'nanoid'
import Cors from '@fastify/cors'
import Helmet from '@fastify/helmet'
import Fastify from 'fastify'
import Cookie from '@fastify/cookie'
import Session from '@mgcrea/fastify-session'
import UnderPressure from '@fastify/under-pressure'
import swagger from '@fastify/swagger'
import apirefs from '@scalar/fastify-api-reference'

import { store } from './redis.js'
import setupGracefulShutdown from './shutdown.js'
import logger from '../core/winston.js'
import { onRequest, onResponse } from './hooks/context.js'

export default async (routes) => {
  const server = Fastify({
    logger,
    disableRequestLogging: true,
    requestIdLogLabel: 'traceId',
    genReqId: (request) => request.headers['x-trace-id'] || nanoid()
  })
  setupGracefulShutdown(server, 'SIGTERM', 'SIGINT')

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
  server.register(Cors)
  server.register(Helmet, {
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
