import url from 'url'
import path from 'path'

// drop-in replacement for `__filename` and `__dirname` in commonjs.
export const filename = (meta) => url.fileURLToPath(meta.url)

export const dirname = (meta) => path.dirname(filename(meta))
