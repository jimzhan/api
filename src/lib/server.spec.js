import test from 'ava'
import supertest from 'supertest'
import server from './server.js'

test('server()', async t => {
  t.teardown(() => { server.close() })

  server.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    handler: function(request, reply) {
      reply.send({ hello: 'world' })
    }
  })

  await server.ready()

  const response = await supertest(server.server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})
