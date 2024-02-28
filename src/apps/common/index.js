import * as api from './common.api.js'

export default async (fastify) => {
  fastify.get('/ping', ...api.ping(fastify))
}
