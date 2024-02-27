import config from 'config'
import { nanoid } from 'nanoid'
import Fastify from 'fastify'
import Passport from '@fastify/passport'
import SecureSession from '@fastify/secure-session'
import UnderPressure from '@fastify/under-pressure'

export default async (routes) => {
  const server = Fastify({
    logger: true,
    requestIdLogLabel: 'traceId',
    genReqId: (request) => request.headers['x-trace-id'] || nanoid()
  })

  server.register(SecureSession, config.session)
  server.register(Passport.initialize())
  server.register(Passport.secureSession())
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

  await server.ready()

  server.listen({ port: config.port, host: config.host })

  return server
}
