const config = require('config')

export default {
  client: config.get('db.client'),
  connection: {
    connectionString: config.get('db.url')
  },
  migrations: {
    directory: 'migrations'
  },
  seeds: {
    directory: 'seeds'
  }
}
