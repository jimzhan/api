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

const ValidationError = {
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

export const errors = {
  [status.BAD_REQUEST]: ValidationError,
  [status.UNAUTHORIZED]: Error,
  [status.NOT_FOUND]: Error,
  [status.METHOD_NOT_ALLOWED]: Error,
  [status.UNSUPPORTED_MEDIA_TYPE]: Error,
  [status.TOO_MANY_REQUESTS]: Error,
  [status.INTERNAL_SERVER_ERROR]: Error,
  [status.BAD_GATEWAY]: Error
}
