import argon2 from 'argon2'

/**
 * Encrypt secret string via bcrypt.
 * @param { String } secret string in plain text to be encrypted.
 * --------------------------------------------------------------------------------
 *  **NOTE**
 *    Available Options: https://github.com/ranisalt/node-argon2/wiki/Options
 */
export const encrypt = async (secret) => {
  return await argon2.hash(secret, { type: argon2.argon2id })
}

/**
 * Check whether the plain text secret string  is the source of encrypted one.
 * @param {String} hash - encrypted hash string.
 * @param {String} secret - secret string in plain text.
 */
export const verify = async (hash, secret) => {
  return await argon2.verify(hash, secret)
}
