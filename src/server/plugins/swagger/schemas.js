const schemas = [
  {
    $id: 'errorResponseSchema',
    type: 'object',
    properties: {
      code: { type: 'string' },
      message: { type: 'string' }
    }
  },
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

export default schemas
