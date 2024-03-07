import {
  describe,
  expect,
  it
} from 'vitest'

import { Producer } from './kafka.js'

describe('kafka', async () => {
  it('produce message', async () => {
    const producer = new Producer('order')
    const result = producer.write({ test: 'test' })
    expect(result).toBeTruthy()
  })
})
