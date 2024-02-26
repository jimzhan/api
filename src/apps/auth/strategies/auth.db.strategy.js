import LocalStrategy from 'passport-local'
import { authenticate } from '../auth.service.js'

export default new LocalStrategy(async (username, password, done) => {
  const login = await authenticate(username, password)
  if (!login.user) {
    return done(login.user, login.authenticated)
  }
  return done(null, login.user)
})
