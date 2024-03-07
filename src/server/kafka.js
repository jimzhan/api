import EventEmitter from 'node:events'
import Kafka from 'node-rdkafka'

// -- Stream API ONLY --

export class Producer extends EventEmitter {
  constructor(options) {
    super()
    this.options = options
    this.producer = new Kafka.Producer(this.options)
  }
}

export function createMessage(topic, partition, value = {}) {
  return {
    topic,
    partition: partition || 0,
    value: Buffer.from(JSON.stringify(value))
  }
}
