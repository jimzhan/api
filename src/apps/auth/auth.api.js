import status from 'http-status-codes'
import * as services from './auth.service.js'
import schema from './auth.schema.js'

export const login = (fastify) => async (request, reply) => {
  request.log.info(`Logged in as: ${request.session.user}`)
  return reply.code(status.OK).send({ data: '/login' })
}

export const authenticate = (fastify) => [
  { schema },
  async (request, reply) => {
    const { username, password } = request.body
    const login = await services.authenticate(username, password)
    if (login.user && login.authenticated) {
      request.session.user = login.user
      return reply.code(status.OK).send({ data: login.user })
    }
    return reply
      .code(status.UNAUTHORIZED)
      .send({ code: 'AUTH_001', message: 'Wrong username or password' })
  }
]
