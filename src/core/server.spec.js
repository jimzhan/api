import { afterAll, expect, test } from 'vitest'
import supertest from 'supertest'
import server from './server.js'

test('server()', async () => {
  await server.ready()
  const response = await supertest(server.server).get('/status')
  expect(response.statusCode).toBe(200)
  expect(response.body).toEqual({ status: 'ok' })
})

afterAll(() => {
  server.close()
})
