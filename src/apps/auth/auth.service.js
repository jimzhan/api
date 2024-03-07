import { User } from './auth.model.js'
import { verify } from '../../core/secret.js'

/**
 *
 * @param {String} username
 * @param {String} password
 *
 * @returns {Object} { user, authenticated }
 */
export const authenticate = async (username, password) => {
  const login = { user: null, authenticated: false }
  const user = await User.query().findOne({ username })

  if (user) {
    const authenticated = await verify(user.password, password)
    delete user.password
    Object.assign(login, { user, authenticated })
  }

  return login
}
