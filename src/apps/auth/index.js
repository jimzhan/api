import { login } from './auth.api.js'

export default async (fastify) => {
  fastify.route({ method: 'GET', url: '/login', handler: login(fastify) })
}
