import Knex from 'knex'
import config from 'config'

const knex = Knex(config.db)

export default knex
