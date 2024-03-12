import { describe, expect, it } from 'vitest'

import { Producer } from './kafka.js'

describe('kafka', async () => {
  it('produces message to topic', async () => {
    const producer = new Producer('a_test_topic')
    await producer.ready()
    expect(
      producer.write({
        stringType: 'string-value',
        booleanType: true,
        intType: 10,
        nestedMap: { intType: 1 }
      })
    ).toBeTruthy()
  })

  it('throws error on invalid value schema', async () => {
    const producer = new Producer('another_test_topic')
    await producer.ready()
    expect(() =>
      producer.write({
        notSupportedType: null
      })
    ).toThrowError()
  })

  it('throws error on invalid connection', async () => {
    const producer = new Producer('a_test_topic', {
      'metadata.broker.list': 'some_where_outer_space:443'
    })
    expect(producer.ready()).rejects.toBeInstanceOf(Error)
  })
})
