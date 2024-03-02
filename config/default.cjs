const path = require('path')

module.exports = {
  debug: true,
  host: '0.0.0.0',
  port: 8000,
  urls: {
    home: '/home'
  },
  api: {
    prefix: '/api',
    title: 'API Docs',
    version: '0.1.0'
  },
  db: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      database: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 5,
      max: 10
    },
    migrations: {
      directory: path.join('db', 'migrations')
    },
    seeds: {
      directory: path.join('db', 'seeds')
    }
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    username: null,
    password: null,
    enableAutoPipelining: true
  },
  session: {
    cookieName: 'sid',
    sessionName: 'session',
    secret: process.env.SECRET || 'Jeqrldi6lyFKHtN5O5Sjgx0l2z5KuTH7',
    cookie: {
      path: '/',
      maxAge: 7200,
      secure: false
    }
  }
}
