import { AsyncLocalStorage } from 'async_hooks'

const context = new AsyncLocalStorage()

export default context
