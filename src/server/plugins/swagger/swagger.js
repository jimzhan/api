import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export const swaggerize = (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'API Endpoints',
        description: 'Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter your JWT based bearer token in the format **Bearer &lt;token&gt;**'
          }
        }
      },
      security: [{ bearerAuth: ['read'] }]
    },
    exposeRoute: true
  })

  fastify.register(swaggerUi, { routePrefix: '/documentation' })
}
