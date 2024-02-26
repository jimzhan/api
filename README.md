# API Application Boilerplate

An opinionated API application startup kit with set of best practices.

## Foundations

- **Configuration** [Config](https://www.npmjs.com/package/config)
- **Web Server** [Fastify](https://github.com/fastify/fastify)
- **Test Runner** [Vitest](https://vitest.dev)
- **SCA** [ESLint](https://eslint.org/) + [Airbnb](https://github.com/airbnb/javascript)
- **Logger** [Winston](https://github.com/winstonjs/winston)

## TODOs

- [x] Configuration
- [x] Knex.js
- [ ] Objection.js
- [ ] Passport.js (incl. local PG user pool)
- [ ] Kafka Connector
- [ ] Swagger Integration


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
│   │   │   │   ├── local.strategy.js
│   │   │   │   ├── ad.strategy.js
│   │   │   ├── auth.api.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.model.js
```
