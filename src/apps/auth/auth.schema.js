import status from 'http-status-codes'

const sharedSchemas = [
  {
    $id: 'user',
    type: 'object',
    properties: {
      id: { type: 'string' },
      username: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  }
]

export const authResponse = {
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

export default sharedSchemas
