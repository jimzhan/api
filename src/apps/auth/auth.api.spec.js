import { describe, beforeAll, afterAll, beforeEach, afterEach, expect, it } from 'vitest'

import bootstrap from '../../server/bootstrap.js'
import routes from '../index.js'
import Key from '../../db/key.js'
import { User } from './auth.model.js'
import * as crypto from '../../core/crypto.js'

let server

beforeAll(async () => {
  server = await bootstrap(routes)
})

describe('/auth/authenticate', () => {
  const username = `${Key()}@test.com`
  const password = 'password'

  beforeEach(async () => {
    await User.query().insert({
      username,
      password: await crypto.encrypt(password)
    })
  })

  afterEach(async () => {
    await User.query().findOne({ username }).delete()
  })

  it('responds with 200 for correct user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/authenticate',
      body: {
        username,
        password
      }
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).data.username).toEqual(username)
    expect(isNaN(new Date(JSON.parse(response.payload).data.createdAt))).toBeFalsy()
  })

  it('responds with 400 for missing payload', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/authenticate'
    })
    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.payload).code).toEqual('FST_ERR_VALIDATION')
  })

  it('responds with 400 for missing password', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/authenticate',
      body: {
        username: 'A_COOL_COW_BOY',
        password: 'SUPER_SECRET'
      }
    })
    expect(response.statusCode).toBe(401)
    expect(response.payload).toEqual('{"code":"AUTH_001","message":"Wrong username or password"}')
  })
})

afterAll(() => {
  server.close()
})
