import config from 'config'
import Fastify from 'fastify'
import SecureSession from '@fastify/secure-session'
import underPressure from '@fastify/under-pressure'
import logger from './logger.js'

const server = Fastify({ logger })

server.register(SecureSession, {
  key: config.secret,
  sessionName: 'session',
  cookieName: config.cookie.name,
  cookie: {
    path: '/',
  },
})

server.register(underPressure, {
  async healthCheck() {
    // TODO: Add database connection check
    return true;
  },
  message: 'Under Pressure 😯',
  exposeStatusRoute: '/status',
  healthCheckInterval: 5000,
})

export default server
