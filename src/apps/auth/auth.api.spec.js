import status from 'http-status-codes'
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

describe('/auth', () => {
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

  it('/auth/login responds with 200 for correct user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/login',
      body: {
        username,
        password
      }
    })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).data.username).toEqual(username)
    expect(isNaN(new Date(JSON.parse(response.payload).data.createdAt))).toBeFalsy()
  })

  it('/auth/logout responds with 202 when logging out', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/logout'
    })
    expect(response.statusCode).toBe(status.ACCEPTED)
  })
})

afterAll(() => {
  server.close()
})
