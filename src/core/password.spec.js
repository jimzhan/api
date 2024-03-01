import { describe, it, expect } from 'vitest'
import * as password from './password.js'

describe('password.js', () => {
  const secret = 'ThisIsTheSameSecretString'

  it('password#encrypt()', async () => {
    const hash = await password.encrypt(secret)
    expect(hash).not.toEqual(await password.encrypt(secret))
  })

  it('password#verify()', async () => {
    const result = await password.verify(await password.encrypt(secret), secret)
    expect(result).toBeTruthy()
  })
})
