
export const onRequest = (request, reply, done) => {
  request.log.info({ url: request.raw.url, id: request.id }, 'received request')
  done()
}

export const onResponse = (request, reply, done) => {
  request.log.info({ url: request.raw.originalUrl, statusCode: reply.raw.statusCode }, 'request completed')
  done()
}
