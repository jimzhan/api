import winston from 'winston'
import Rotation from 'winston-daily-rotate-file'
import * as fsx from './fsx.js'

const basedir = fsx.dirname(import.meta, '../../logs')
const service = process.env.npm_package_name || 'app'

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
  defaultMeta: { service },
  transports: [
    new winston.transports.Console(),
    new Rotation({
      dirname: basedir,
      filename: `${service}.%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d'
    })
  ]
})
