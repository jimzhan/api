# API Application Boilerplate

An opinionated API application startup kit with set of best practices.

## Prerequisites

- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)


## Foundations

- **Configuration** [Config](https://www.npmjs.com/package/config)
- **Web Server** [Fastify](https://github.com/fastify/fastify)
- **Test Runner** [Vitest](https://vitest.dev)
- **SCA** [ESLint](https://eslint.org/) + [StandardJS](https://standardjs.com/)
- **Logger** [Winston](https://github.com/winstonjs/winston)

## TODOs

- [x] Configuration
- [x] Knex.js
- [x] Objection.js
- [x] Authentication (with local PG user pool)
- [x] Swagger Integration
- [ ] Redis Integration
- [ ] Kafka Connector
- [ ] Standard Log


## Bootstrap

The following command generate a secret key for `@fastify/secure-session`.

`yarn genkey`


## Folder Structrure (Grouped by Features)

```bash
├── config
│   ├── default.cjs
│   ├── production.cjs
│   └── test.cjs
├── db
│   ├── migrations
│   ├── seeds
├── src
│   ├── apps
│   │   ├── auth
│   │   │   ├── auth.api.js                 # Auth API
│   │   │   └── auth.model.js               # Auth models
│   │   │   ├── auth.service.js             # Auth services
│   │   │   ├── auth.schema.js              # Auth I/O schema
│   │   │   └── index.js                    # Auth routes
│   │   └── index.js                        # Applications' routes
```
