import config from 'config'
import status from 'http-status-codes'

import * as schema from './auth.schema.js'
import * as services from './auth.service.js'

// @TODO better I/O structure & error handling.
// @TODO Error handling.
// @TODO separate route defs & logics.
export default async (fastify) => {
  fastify.post('/login', { schema: schema.login }, async (request, reply) => {
    const { username, password } = request.body
    const login = await services.authenticate(username, password)

    if (login.user && login.authenticated) {
      request.session.user = login.user
      return reply
        .code(status.OK)
        .send({ next: config.urls.home })
    }
    return reply
      .code(status.UNAUTHORIZED)
      .send({ code: 'login.failed', message: 'Wrong username or password' })
  })

  fastify.post('/logout', async (request, reply) => {
    await request.session.destroy()
    return reply.code(status.ACCEPTED).send({ data: 'OK' })
  })
}
