import {
  describe,
  expect,
  it
} from 'vitest'

import { Producer } from './kafka.js'

describe('kafka', async () => {
  it('produce message', async () => {
    const producer = new Producer('order')
    const success = producer.write({ test: 'test' })
    expect(success).toBeTruthy()
  })
})
