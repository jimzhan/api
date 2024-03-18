import { Data } from '../response.js'

export const requestId = 'X-Request-Id'

// eslint-disable-next-line no-unused-vars
export const onRequest = (request, reply, done) => {
  request.log.info({ url: request.raw.url, id: request.id }, 'received request')
  done()
}

// eslint-disable-next-line no-unused-vars
export const onResponse = (request, reply, done) => {
  request.log.info({ url: request.raw.originalUrl, statusCode: reply.raw.statusCode }, 'request completed')
  done()
}

export const onSend = async (request, reply, payload) => {
  reply.raw.setHeader(requestId, request.id)
  return payload
}

// eslint-disable-next-line no-unused-vars
export const preSerialization = async (request, reply, payload) => {
  // @TODO Advanced data structure supports.
  request.log.info(payload, 'serialized data')
  return Data.from(payload)
}
