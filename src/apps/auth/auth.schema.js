import status from 'http-status-codes'

const schema = {
  description: 'Login',
  tags: ['auth'],
  summary: 'System login with username',
  body: {
    type: 'object',
    required: ['username', 'password'],
    additionalProperties: false,
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    }
  },
  response: {
    [status.OK]: {
      type: 'object',
      properties: {
        data: {
          $ref: 'user#'
        }
      }
    },
    [status.UNAUTHORIZED]: { $ref: 'errorResponseSchema#' }
  }
}

export default schema
