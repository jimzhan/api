import path from 'node:path'
import winston from 'winston'

const basedir = 'logs'
const service = process.env.npm_package_name || 'backoffice'

const logger = winston.createLogger({
  level: 'info',
  // Define levels required by Fastify (by default winston has verbose level and does not have trace)
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
    new winston.transports.File({
      level: 'error',
      filename: `${path.join(basedir, 'error.log')}`
    }),
    new winston.transports.File({
      filename: `${path.join(basedir, 'combined.log')}`
    })
  ]
})

export default logger
