import status from 'http-status-codes'
import { pingResponse } from './common.schema.js'

export const ping = (fastify) => [
  { schema: pingResponse },
  async (request, reply) => {
    return reply.code(status.OK).send('pong!')
  }
]
