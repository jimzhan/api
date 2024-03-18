# API Application Boilerplate

An opinionated API application startup kit with set of best practices.


## Prerequisites

- [Podman](https://podman.io/) for local development


## Foundations

- **Configuration** [Config](https://www.npmjs.com/package/config)
- **Local Infrastruture** [Kafka](https://kafka.apache.org/) + [PostgreSQL@16](https://www.postgresql.org/) + [Redis](https://redis.io/) with [Podman](https://podman.io/)
- **Logger** [Winston](https://github.com/winstonjs/winston)
- **SCA** [ESLint](https://eslint.org/) + [StandardJS](https://standardjs.com/)
- **Test Runner** [Vitest](https://vitest.dev)
- **Web Server** [Fastify](https://github.com/fastify/fastify)


## TODOs

- [x] Configuration
- [x] Knex.js
- [x] Objection.js
- [x] Authentication (with local PG user pool)
- [x] Swagger Integration
- [x] Redis Integration
- [x] Kafka Connector
- [x] Standard I/O
- [ ] i18n Support
- [ ] Standard Log (refer to [AWS Logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/logging-monitoring-for-application-owners/event-attributes.html))


## Bootstrap

```shell
yarn install
yarn infra:start
yarn db:init
```


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
