import LocalStrategy from 'passport-local'
import { authenticate } from './auth.service.js'

export const DatabaseStrategy = new LocalStrategy(async (username, password, callback) => {
  try {
    const login = await authenticate(username, password)

    if (login.user && login.authenticated) {
      return callback(null, login.user)
    }

    return callback(null, false)
  } catch (err) {
    return callback(err)
  }
})
