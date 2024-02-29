import { describe, beforeAll, afterAll, expect, it } from 'vitest'

import bootstrap from '../../server/bootstrap.js'
import routes from '../index.js'

let server

beforeAll(async () => {
  server = await bootstrap(routes)
})

describe('/common/ping', () => {
  it('responds pong! when I ping', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/common/ping'
    })
    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual('pong!')
  })
})

afterAll(() => {
  server.close()
})
