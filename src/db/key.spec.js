import { expect, test } from 'vitest'
import { isValid } from 'ulidx'
import Key from './key.js'

test('db.Key()', () => {
  const id = Key()
  expect(isValid(id)).toBeTruthy()
  expect(id.length).toBe(26)
  expect(Key() > id).toBe(true)
})
