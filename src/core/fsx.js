import url from 'node:url'
import path from 'node:path'

// drop-in replacement for `__filename` and `__dirname` in commonjs.

/**
 * @param {import('node:module').Module} meta
 */
export const filename = (meta) => url.fileURLToPath(meta.url)

/**
 * @param {import('node:module').Module} meta
 */
export const dirname = (meta, ...segments) => {
  const here = path.dirname(filename(meta))
  return segments.length > 0 ? path.join(here, ...segments) : here
}

/**
 * Direct shortcuts to `path.join`.
 */
export const join = path.join
