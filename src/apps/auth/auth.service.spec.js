import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import Key from '../../db/key.js'
import { User } from './auth.model.js'
import { authenticate } from './auth.service.js'
import * as crypto from '../../core/crypto.js'

describe('auth.service.spec.js#authenticate()', () => {
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

  it('authenticate()', async () => {
    const login = await authenticate(username, password)
    expect(login.user).toBeTruthy()
    expect(login.user.username).toBe(username)
    expect(login.user.password).toBeUndefined()
  })

  it('authenticate() with wrong username', async () => {
    const login = await authenticate({
      username: 'wrong-user-name',
      password
    })
    expect(login.user).toBeNull()
  })

  it('authenticate() with wrong password', async () => {
    const login = await authenticate({
      username,
      password: 'wrongpassword'
    })
    expect(login.user).toBeFalsy()
    expect(login.authenticated).toBeFalsy()
  })
})
