import status from 'http-status-codes'

import { errors } from '../apps.schema.js'

export const login = {
  description: 'Sign in with username and password',
  body: {
    title: 'Sign In',
    type: 'object',
    additionalProperties: false,
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        format: 'email',
        minLength: 6,
        maxLength: 100,
        errorMessage: {
          minLength: 'should be at least 6 characters long',
          format: 'should be a valid email'
        }
      },
      password: {
        type: 'string',
        errorMessage: { pattern: 'should be compliant with password policy' }
      }
    }
  },
  response: {
    [status.OK]: {
      type: 'object',
      properties: {
        data: { type: 'object' }
      }
    },
    ...errors
  }
}
