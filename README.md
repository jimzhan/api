# API Application Boilerplate

An opinionated API application startup kit with set of best practices.

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
- [ ] Passport.js (incl. local PG user pool)
- [ ] Kafka Connector
- [ ] Swagger Integration


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
│   │   │   ├── strategies
│   │   │   │   ├── auth.db.strategy.js
│   │   │   │   ├── auth.ad.strategy.js
│   │   │   ├── auth.api.js                 # Auth API
│   │   │   ├── auth.service.js             # Auth services
│   │   │   └── auth.model.js               # Auth models
│   │   │   └── index.js                    # Auth routes
│   │   └── index.js                        # Applications' routes
```
