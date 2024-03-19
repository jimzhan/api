import { Data } from '../response.js'

export const requestId = 'X-Request-Id'

// eslint-disable-next-line no-unused-vars
export const onRequest = async (request, reply) => {
  request.log.info({ url: request.raw.url, id: request.id }, 'received request')
}

// eslint-disable-next-line no-unused-vars
export const onResponse = async (request, reply) => {
  request.log.info({ url: request.raw.originalUrl, statusCode: reply.raw.statusCode }, 'request completed')
}

export const onSend = async (request, reply, payload) => {
  reply.raw.setHeader(requestId, request.id)
  return payload
}

// eslint-disable-next-line no-unused-vars
export const preSerialization = async (request, reply, payload) => {
  // @TODO Advanced data structure supports.
  return Data.from(payload)
}
