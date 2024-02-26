import config from 'config'
import Fastify from 'fastify'
import passport from '@fastify/passport'
import SecureSession from '@fastify/secure-session'
import underPressure from '@fastify/under-pressure'

const server = Fastify({ logger: true })

server.register(SecureSession, config.session)
server.register(passport.initialize())
server.register(passport.secureSession())

server.register(underPressure, {
  async healthCheck() {
    // @TODO: Add database connection check
    return true
  },
  message: 'Under Pressure 😯',
  exposeStatusRoute: '/status',
  healthCheckInterval: 5000
})

export default server
