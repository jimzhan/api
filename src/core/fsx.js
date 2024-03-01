import url from 'url'
import path from 'path'

// drop-in replacement for `__filename` and `__dirname` in commonjs.

/**
 * @param {import('node:module').Module} meta
 */
export const filename = (meta) => url.fileURLToPath(meta.url)

/**
 * @param {import('node:module').Module} meta
 */
export const dirname = (meta) => path.dirname(filename(meta))
