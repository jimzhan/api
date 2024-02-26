import status from 'http-status-codes'

export const login = (fastify) => async (request, reply) => {
  return reply.code(status.CREATED).send({ data: null })
}
