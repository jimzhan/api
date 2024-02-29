import status from 'http-status-codes'
import * as services from './auth.service.js'

// @TODO better I/O structure & error handling.
export default async (fastify) => {
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body
    const login = await services.authenticate(username, password)
    if (login.user && login.authenticated) {
      request.session.user = login.user
      return reply.code(status.OK).send({ data: login.user })
    }
    return reply
      .code(status.UNAUTHORIZED)
      .send({ code: 'AUTH_001', message: 'Wrong username or password' })
  })

  fastify.post('/logout', async (request, reply) => {
    await request.session.destroy()
    return reply.code(status.ACCEPTED).send({ data: 'OK' })
  })
}
