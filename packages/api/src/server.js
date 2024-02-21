import Fastify from 'fastify'
import logger from './logger.js'

const server = Fastify({ logger })

export default server
