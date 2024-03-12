import config from 'config'
import Kafka from 'node-rdkafka'
import { Type } from 'avsc'

import logger from '../core/winston.js'

export const Event = Type.forSchema({
  name: 'Event',
  type: 'record',
  fields: [
    { name: 'topic', type: 'string' },
    {
      name: 'value',
      type: {
        type: 'map',
        // multiple types are supported as values type
        // nested map is supported but needs to be statically defined
        values: ['string', 'int', 'boolean', { type: 'map', values: ['string', 'int', 'boolean'] }]
      }
    },
    { name: 'partition', type: 'int', default: -1 },
    // int or long to be used as timestamp
    { name: 'timestamp', type: 'long', default: Date.now() }
  ]
})

// @TODO More flexibilities on config (partition & options).
// @TODO Exceptions handlings.
export class Producer {
  constructor(topic, options) {
    this.topic = topic
    this.producer = new Kafka.Producer({
      ...config.kafka.broker,
      ...options
    })
    const { timeout, pollInterval } = config.kafka.conn

    let init
    this.isReady = new Promise((resolve, reject) => {
      init = { resolve, reject }
    })
    this.producer.connect({ timeout }, (err) => {
      logger.error("Kafka producer didn't connect")
      if (err) init.reject(err)
      else init.resolve('Kafka producer initialized')
    })

    this.producer.on('ready', (_, metadata) => {
      logger.info('Kafka producer initialized')
      logger.info(metadata)
    })

    this.producer.on('event.error', (err) => {
      logger.error('Error from producer')
      logger.error(err)
    })

    this.producer.on('delivery-report', (err, report) => {
      logger.info('Kafka delivery report received')
      logger.error(err)
      logger.info(report)
    })

    this.producer.setPollInterval(pollInterval)
  }

  ready() {
    return this.isReady
  }

  write(value, partition = -1) {
    const payload = {
      value,
      partition,
      topic: this.topic,
      timestamp: Date.now()
    }
    return this.producer.produce(this.topic, -1, Event.toBuffer(payload))
  }
}

export class Consumer {
  constructor(topic) {
    this.topic = topic
    this.stream = Kafka.Consumer.createReadStream(
      config.kafka.broker,
      config.kafka.topic,
      { topic: this.topic }
    )
  }
}
