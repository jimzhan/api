import test from 'ava'
import supertest from 'supertest'
import server from './server.js'

test('server()', async (t) => {
  t.teardown(() => { server.close() })
  await server.ready()
  const response = await supertest(server.server).get('/status')
  t.is(response.statusCode, 200)
  t.deepEqual(response.body, { status: 'ok' })
})
