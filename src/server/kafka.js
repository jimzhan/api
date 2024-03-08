import config from 'config'
import Kafka from 'node-rdkafka'

// @TODO More flexibilities on config (partition & options).
// @TODO Exceptions handlings.
export class Producer {
  constructor(topic, partition = -1) {
    this.topic = topic
    this.partition = partition
    this.stream = Kafka.Producer.createWriteStream(
      config.kafka.broker,
      {},
      { topic: this.topic }
    )
  }

  write(data, partition) {
    return this.stream.write(Buffer.from(JSON.stringify({
      topic: this.topic,
      partition: partition || this.partition,
      value: data
    })))
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
