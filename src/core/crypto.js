import bcrypt from 'bcrypt'

const rounds = 10

/**
 * Encrypt secret string via bcrypt.
 * @param {String} secret string in plain text to be encrypted.
 */
export const encrypt = (secret) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(secret, rounds, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  })

/**
 * Check whether the plain text secret string  is the source of encrypted one.
 * @param {String} secret - secret string in plain text.
 * @param {String} hash - encrypted hash string.
 */
export const compare = (secret, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(secret, hash, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
