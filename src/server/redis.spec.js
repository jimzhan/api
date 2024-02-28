import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it
} from 'vitest'

import Key from '../db/key.js'
import { redis } from './redis.js'

let value
const key = 'sid'

describe('redis', () => {
  beforeEach(async () => {
    value = Key()
    await redis.set(key, value)
  })

  afterEach(async () => {
    await redis.del(key)
  })

  it('should get() to redis', async () => {
    const val = await redis.get(key)
    expect(val).toEqual(value)
  })
})

afterAll(async () => {
  await redis.flushdb()
})
