import { describe, it, expect } from 'vitest'
import * as fsx from './fsx.js'

describe('fsx.js', () => {
  it('fsx#filename', () => {
    expect(fsx.filename(import.meta).endsWith('fsx.spec.js')).toBe(true)
  })

  it('fsx#dirname()', async () => {
    expect(fsx.dirname(import.meta).endsWith('core')).toBe(true)
  })
})
