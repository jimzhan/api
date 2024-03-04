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
- [x] Redis Integration
- [ ] Standard Log (refer to [AWS Logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/logging-monitoring-for-application-owners/event-attributes.html))
- [ ] Kafka Connector


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
│   │   │   ├── auth.schema.js              # Auth I/O schema
│   │   │   ├── auth.service.js             # Auth services
│   │   │   └── index.js                    # Auth routes
│   │   └── index.js                        # Applications' routes
```
