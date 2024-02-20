import { monotonicFactory } from 'ulidx'

const monotonic = monotonicFactory()

export default () => monotonic(Date.now()).toLowerCase()
