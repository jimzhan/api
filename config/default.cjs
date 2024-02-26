const fs = require('fs')
const path = require('path')

const SecretKey = process.env.SECRET_KEY || 'secret.key'

module.exports = {
  debug: true,
  host: '0.0.0.0',
  port: 8000,
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
  session: {
    sessionName: 'session',
    cookieName: 'sid',
    key: fs.readFileSync(path.join(__dirname, SecretKey)),
    cookie: {
      path: '/'
    }
  }
}
