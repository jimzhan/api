import { describe, afterAll, expect, it } from 'vitest'
import supertest from 'supertest'

import bootstrap from './bootstrap.js'
import routes from './../apps/index.js'

const server = await bootstrap(routes)

describe('/status', () => {
  it('responds with 200', async () => {
    const response = await supertest(server.server).get('/status')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ status: 'ok' })
  })
})

afterAll(() => {
  server.close()
})
