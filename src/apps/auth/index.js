import * as api from './auth.api.js'

export default async (fastify) => {
  fastify.get('/login', api.login(fastify))
  fastify.post('/authenticate', api.authenticate(fastify))
}
