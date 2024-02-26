import knex from './src/db/knex.js'

export async function teardown() {
  knex.destroy()
}
