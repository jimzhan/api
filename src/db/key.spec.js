import test from 'ava'
import { isValid } from 'ulidx'
import Key from './key.js'

test('db.Key()', (t) => {
  const id = Key()
  t.true(isValid(id))
  t.is(id.length, 26)
  t.true(Key() > id)
})
