import { describe, it, expect } from 'vitest'
import * as secret from './secret.js'

describe('secret.js', () => {
  const password = 'ThisIsTheSameSecretString'

  it('secret#encrypt()', async () => {
    const hash = await secret.encrypt(password)
    expect(hash).not.toEqual(await secret.encrypt(password))
  })

  it('password#verify()', async () => {
    const result = await secret.verify(await secret.encrypt(password), password)
    expect(result).toBeTruthy()
  })
})
