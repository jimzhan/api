import config from 'config'
import status from 'http-status-codes'
import { describe, beforeAll, afterAll, beforeEach, afterEach, expect, it } from 'vitest'

import bootstrap from '../../server/bootstrap.js'
import routes from '../index.js'
import Key from '../../db/key.js'
import { User } from './auth.model.js'
import { encrypt } from '../../core/password.js'

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
      password: await encrypt(password)
    })
  })

  afterEach(async () => {
    await User.query().findOne({ username }).delete()
  })

  it('/auth/login responds with 200 for a valid login', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/login',
      body: {
        username,
        password
      }
    })
    const { data } = JSON.parse(response.body)
    expect(response.statusCode).toBe(status.OK)
    expect(data.next).toEqual(config.urls.home)
  })

  it('/auth/login with invalid username/password', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/login',
      body: {
        username: `${Key()}@test.com`,
        password: Key()
      }
    })
    expect(response.statusCode).toBe(status.UNAUTHORIZED)
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
