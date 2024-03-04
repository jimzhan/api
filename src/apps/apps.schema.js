import status from 'http-status-codes'

const Error = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  }
}

const ValidationError = Object.assign({
  description: 'Invalid request'
}, Error)

const UnauthorizedError = Object.assign({
  description: 'Unauthorized request'
}, Error)

const NotFoundError = Object.assign({
  description: 'Requested resource is not found'
}, Error)

const TooManyRequetsError = Object.assign({
  description: 'Excessive requests in no time. Please slow down and try again in a bit'
}, Error)

const InternalServerError = Object.assign({
  description: 'An error has occurred and we are working on the fix!'
}, Error)

export const errors = {
  [status.BAD_REQUEST]: ValidationError,
  [status.UNAUTHORIZED]: UnauthorizedError,
  [status.NOT_FOUND]: NotFoundError,
  [status.TOO_MANY_REQUESTS]: TooManyRequetsError,
  [status.INTERNAL_SERVER_ERROR]: InternalServerError
}
