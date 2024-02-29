import auth from './auth/index.js'
import common from './common/index.js'
import baseSchemas from './schema.js'

export default async (fastify) => {
  // Shared schemas must be registered before routes
  baseSchemas.forEach(s => fastify.addSchema(s))

  fastify.register(common, { prefix: '/common' })
  fastify.register(auth, { prefix: '/auth' })
}
