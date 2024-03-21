import config from 'config'
import status from 'http-status-codes'

import i18n from '../../core/i18n.js'
import * as services from './auth.service.js'

// @TODO better I/O structure & error handling.
// @TODO Error handling.
export const login = async (request, reply) => {
  const { username, password } = request.body
  const login = await services.authenticate(username, password)

  if (login.user && login.authenticated) {
    request.session.user = login.user
    return reply
      .code(status.OK)
      .send({ next: config.urls.home, message: i18n.t('home') })
  }
  return reply
    .code(status.UNAUTHORIZED)
    .send({ message: i18n.t('login.invalid') })
}

export const logout = async (request, reply) => {
  await request.session.destroy()
  return reply.code(status.ACCEPTED).send({ data: 'OK' })
}
