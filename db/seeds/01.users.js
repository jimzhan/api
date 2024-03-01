import Key from '../../src/db/key.js'
import { encrypt } from '../../src/core/password.js'

const tableName = 'users'
const password = await encrypt('password')

export const seed = async (knex) => {
  await knex(tableName).del()
  await knex(tableName).insert([
    { id: Key(), username: 'test@test.com', password }
  ])
}
