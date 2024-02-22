import test from 'ava'
import knex from './knex.js'

test('knex', async t => {
  const result = await knex.raw('select 1 + 1 as result')
  t.not(result, null)
})

test.after.always(() => knex.destroy())
