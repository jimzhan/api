import config from 'config'
import Kafka from 'node-rdkafka'
import Protobuf from 'protobufjs'
import Path from 'path'

import logger from '../core/winston.js'

const protoRoot = Protobuf.loadSync(Path.join(__dirname, '/kafka.proto'))
const Event = protoRoot.lookupType('kafkaproducer.Event')

// @TODO More flexibilities on config (partition & options).
// @TODO Exceptions handlings.
export class Producer {
  constructor(topic, producerOptions) {
    this.topic = topic
    this.stream = Kafka.Producer.createWriteStream(
      {
        ...config.kafka.broker,
        ...producerOptions
      },
      {},
      { topic, connectOptions: config.kafka.conn }
    )

    this.stream.on('error', (err) => {
      logger.error('Kafka producer stream encountered an error')
      logger.error(err)
    })

    let readiness
    this.ready = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Connection timeouts'))
      }, config.kafka.conn.timeout)
      readiness = {
        resolve: (res) => {
          this.isReady = true
          resolve(res)
        },
        reject
      }
    })

    this.stream.producer.on('ready', (meta) => {
      logger.info('Producer is ready to produce messages')
      readiness.resolve()
    })

    this.stream.producer.on('delivery-report', (err, report) => {
      if (err) {
        logger.error('Received an error on delivery report')
        logger.error(err)
      }
      logger.info(report)
    })
  }

  async write(value, partition = -1) {
    if (!this.isReady) return Promise.reject(new Error('Producer is not ready'))
    const payload = {
      value,
      partition,
      topic: this.topic,
      timestamp: Date.now()
    }
    return await new Promise((resolve, reject) => {
      this.stream.write(Buffer.from(Event.encode(payload).finish()), (err) => {
        if (err) {
          logger.error('Msg could not be processed')
          logger.error(err)
          reject(err)
        }
        resolve('success')
      })
    })
  }
}

export class Consumer {
  constructor(topic) {
    this.topic = topic
    this.stream = Kafka.Consumer.createReadStream(config.kafka.broker, config.kafka.topic, {
      topic: this.topic
    })
  }
}
