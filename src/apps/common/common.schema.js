import status from 'http-status-codes'

/**
 * Shared schemas are registered as root schemas,
 * root schemas can be accessed using $ref: 'schema_name#'
 * in all other schema definitions globally
 */
const sharedSchemas = [
  {
    $id: 'errorResponseSchema',
    type: 'object',
    properties: {
      code: { type: 'string' },
      message: { type: 'string' }
    }
  }
]

/**
 * Schema for dedicated endpoints are exported directly
 */
export const pingResponse = {
  response: {
    [status.OK]: { type: 'string' }
  }
}

export default sharedSchemas
