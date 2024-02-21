import Knex from 'knex'
import config from 'config'

const knex = Knex({
  client: config.get('db.client'),
  connection: {
    connectionString: config.get('db.url')
  }
})

export default knex
