import config from 'config'
import Kafka from 'node-rdkafka'

// @TODO More flexibilities on config.
// @TODO Exceptions handlings.
export class Producer {
  constructor(topic, partition = -1) {
    this.topic = topic
    this.partition = partition
    this.stream = Kafka.Producer.createWriteStream(
      config.kafka.producer,
      { 'request.required.acks': 1 },
      { topic: this.topic }
    )
  }

  write(data, partition) {
    this.stream.write({
      topic: this.topic,
      partition: partition || this.partition,
      value: Buffer.from(JSON.stringify(data))
    })
  }
}
