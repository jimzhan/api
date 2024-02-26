import { describe, it, expect } from 'vitest'
import * as crypto from './crypto.js'

describe('crypto.js', () => {
  it('encrypt()', async () => {
    const secret = 'ThisIsTheSameSecretString'
    const a = await crypto.encrypt(secret)
    const b = await crypto.encrypt(secret)
    expect(a.length).toBe(60)
    expect(a.length).toEqual(b.length)
    expect(a).not.toEqual(b)
  })

  it('encrypt() with undefined secret', async () => {
    try {
      await crypto.encrypt(undefined)
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })

  it('compare()', async () => {
    const secret = 'ThisIsTheSameSecretString'
    const hash = await crypto.encrypt(secret)
    const matched = await crypto.compare(secret, hash)
    expect(hash.length).toBe(60)
    expect(matched).toBeTruthy()
  })

  it('compare() with undefined secret', async () => {
    try {
      await crypto.compare(undefined, undefined)
    } catch (err) {
      expect(err).toBeTruthy()
    }
  })
})
