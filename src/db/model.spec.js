import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'
import knex from './knex.js'
import Key from './key.js'
import Model from './model.js'

class Sandbox extends Model {
  static get tableName() {
    return Sandbox.name
  }
}

// Sandbox.knex(knex)

describe('db', () => {
  const tableName = 'Sandbox'
  const username = `${Key()}@test.com`

  beforeAll(async () => {
    await knex.schema.createTable(tableName, (table) => {
      table.specificType('id', 'CHAR(26)').primary()
      table.string('username')
    })
  })

  beforeEach(async () => {
    await Sandbox.query().insert({
      id: Key(),
      username,
    })
  })

  afterEach(async () => {
    await knex.table(tableName).where({ username }).delete()
  })

  afterAll(async () => {
    await knex.schema.dropTable(tableName)
  })

  test('Model.insert() with ID', async () => {
    const id = Key()
    const user = await Sandbox.fromJson({ id, username }).$query().insert()
    expect(user.id).toBe(id)
  })

  test('Model.insert() without ID', async () => {
    const user = await Sandbox.fromJson({ username }).$query().insert()
    expect(user.id).toBeTruthy()
    expect(user.id.length).toBe(26)
  })

  test('Model.select()', async () => {
    const id = Key()
    await Sandbox.fromJson({ id, username }).$query().insert()
    const result = await Sandbox.query().findById(id)
    expect(result).toBeTruthy()
    expect(result.id).toBe(id)
    expect(result.username).toBe(username)
  })

  test('Model.update()', async () => {
    const newname = `${Key()}@example.com`
    const user = await Sandbox.query().findOne({ username })
    const result = await user.$query().patchAndFetch({ username: newname })
    expect(result.username).toBe(newname)
    expect(result.id).toBe(user.id)
  })
})
