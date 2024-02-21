module.exports = {
  debug: true,
  host: '0.0.0.0',
  port: 8000,
  db: {
    client: 'pg',
    url: process.env.DB_URL
  }
}
