import knex from '../db/knex.js'

const logger = console

async function shutdown(fastify, signal) {
  try {
    logger.info({ message: `Got ${signal}. Graceful shutdown start ${new Date().toISOString()}` })
    await knex.destroy()
    await fastify.close()
  } catch (err) {
    logger.error({
      message: 'SERVER_SHUTDOWN signalHandler Could not shutdown everything cleanly!',
      err
    })
  } finally {
    // eslint-disable-next-line no-process-exit
    process.exit()
  }
}

export default async (fastify, ...signals) => {
  signals.forEach(signal => {
    process.on(signal, () => {
      shutdown(fastify)
    })
  })

  process.on('uncaughtException', err => {
    // eslint-disable-next-line no-console
    logger.error(
      '[UNCAUGHT_EXCEPTION]',
      `${new Date().toUTCString()}: Process will now exit. UncaughtException:`,
      err.message,
      err.stack
    )
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
}
