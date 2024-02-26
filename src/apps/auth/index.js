import AuthRoute from './auth.api.js'

export default async (fastify) => {
  fastify.register(AuthRoute, { prefix: '/auth' })
}
