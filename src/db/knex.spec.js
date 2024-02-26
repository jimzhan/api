import { expect, test } from 'vitest'
import knex from './knex.js'

test('knex', async () => {
  const result = await knex.raw('select 1 + 1 as result')
  expect(result).not.toBeNull()
})
