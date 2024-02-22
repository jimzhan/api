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
      password: 'postgres',
    },
    pool: {
      min: 5,
      max: 10,
    },
    migrations: {
      directory: 'migrations',
    },
    seeds: {
      directory: 'seeds',
    },
  },
  cookie: {
    name: 'sid',
  },
  secret: '2<_"yJs++GjgikKg4kq&xcBq(%>$k>\'6<>!R9*2[XzwylP{fzpZHCKB8j)cCFb',
}
