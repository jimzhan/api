import { describe, expect, it } from 'vitest'

import { Producer } from './kafka.js'

describe('kafka', async () => {
  it('produces message to topic', async () => {
    const producer = new Producer('a_test_topic')
    await producer.ready
    const result = await producer.write({
      stringType: 'string-value',
      booleanType: true,
      intType: 10,
      doubleType: 3.14,
      nestedMap: { intType: 1 },
      listType: [1, 2, 3]
    })
    expect(result).toBe('success')
  })

  it('throws error on invalid value schema', async () => {
    const producer = new Producer('another_test_topic')
    await producer.ready
    expect(
      producer.write({
        notSupportedType: null
      })
    ).rejects.toBeInstanceOf(TypeError)
  })

  it('throws error on invalid connection', async () => {
    const producer = new Producer('a_test_topic', {
      'metadata.broker.list': 'some_where_outer_space:443'
    })
    expect(producer.ready).rejects.toBeInstanceOf(Error)
  })
})
