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
import ajvErrors from 'ajv-errors'

import { store } from './redis.js'
import logger from '../core/winston.js'
import * as ctx from './hooks/context.js'
import setupGracefulShutdown from './shutdown.js'

export default async (routes) => {
  const server = fastify({
    logger,
    disableRequestLogging: true,
    requestIdLogLabel: 'traceId',
    genReqId: (request) => request.headers['x-trace-id'] || nanoid(),
    ajv: {
      customOptions: {
        jsonPoints: true,
        allErrors: true
      },
      plugins: [ajvErrors]
    }
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
  server.addHook('onRequest', ctx.onRequest)
  server.addHook('onResponse', ctx.onResponse)
  server.addHook('preSerialization', ctx.preSerialization)
  server.register(routes)

  await server.ready()

  return server
}
