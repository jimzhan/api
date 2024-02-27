import auth from './auth/index.js'

export default async (fastify) => {
  fastify.register(auth)
}
