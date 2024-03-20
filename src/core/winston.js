import path from 'node:path'
import winston from 'winston'

import * as fsx from './fsx.js'

const basedir = fsx.dirname(import.meta, '../../logs')

// @TODO https://docs.aws.amazon.com/prescriptive-guidance/latest/logging-monitoring-for-application-owners/event-attributes.html

export default winston.createLogger({
  level: 'info',
  // By default winston has verbose level and does not have trace.
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5
  },
  format: winston.format.json(),
  defaultMeta: { service: process.env.npm_package_name },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'error',
      filename: `${path.join(basedir, 'error.log')}`
    }),
    new winston.transports.File({
      filename: `${path.join(basedir, 'combined.log')}`
    })
  ]
})
