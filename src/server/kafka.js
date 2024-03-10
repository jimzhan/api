import config from 'config'
import Kafka from 'node-rdkafka'
import { Type } from 'avsc'

export const Event = Type.forSchema({
  name: 'Event',
  type: 'record',
  fields: [
    { name: 'topic', type: 'string' },
    { name: 'key', type: 'string' },
    { name: 'value', type: 'map' },
    { name: 'partition', type: 'int', default: -1 },
    { name: 'timestamp', type: 'date', default: Date.now() }
  ]
})

// @TODO More flexibilities on config (partition & options).
// @TODO Exceptions handlings.
export class Producer {
  constructor(topic) {
    this.topic = topic
    this.stream = Kafka.Producer.createWriteStream(
      config.kafka.broker,
      {},
      { topic: this.topic }
    )
  }

  write(value, partition = -1) {
    const payload = {
      value,
      partition,
      topic: this.topic
    }
    return this.stream.write(Buffer.from(JSON.stringify(payload)))
  }
}

export class Consumer {
  constructor(topic) {
    this.topic = topic
    this.consumer = Kafka.Consumer.createReadStream(
      config.kafka.broker,
      config.kafka.topic,
      { topic: this.topic }
    )
  }
}
