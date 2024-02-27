import config from 'config'
import Fastify from 'fastify'
import Passport from '@fastify/passport'
import SecureSession from '@fastify/secure-session'
import underPressure from '@fastify/under-pressure'

export default async (routes) => {
  const server = Fastify({ logger: true })

  server.register(SecureSession, config.session)
  server.register(Passport.initialize())
  server.register(Passport.secureSession())
  server.register(routes)
  server.register(underPressure, {
    async healthCheck() {
      // @TODO: Add database connection check
      return true
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/status',
    healthCheckInterval: 5000
  })

  await server.ready()

  server.listen({ port: config.port, host: config.host })

  return server
}
