import { describe, afterAll, expect, it } from 'vitest'
import supertest from 'supertest'

import node from './node.js'
import routes from './../apps/index.js'

const server = await node(routes)

describe('/status', () => {
  it('responds with 200', async () => {
    const response = await supertest(server.server).get('/status')
    expect(response.statusCode).toBe(200)
  })
})

afterAll(() => {
  server.close()
})
