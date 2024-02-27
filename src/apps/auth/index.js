import passport from '@fastify/passport'

import { DatabaseStrategy } from './auth.strategy.js'

const strategy = 'database'

passport.use(strategy, DatabaseStrategy)

export default async (fastify) => {
  fastify.post('/login',
    { preValidation: passport.authenticate(strategy, { successRedirect: '/api', authInfo: false }) },
    () => { }
  )

  fastify.get(
    '/api',
    { preValidation: passport.authenticate(strategy, { authInfo: false }) },
    async () => 'hello world!'
  )
}
