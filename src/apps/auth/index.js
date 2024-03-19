import * as schema from './auth.schema.js'
import { login, logout } from './auth.api.js'

export default async (fastify) => {
  fastify.post('/login', { schema: schema.login }, login)

  fastify.post('/logout', logout)

  fastify.get('/me', async (request, reply) => {
    return reply.code(200).send({ name: 'name', message: 'message' })
  })
}
