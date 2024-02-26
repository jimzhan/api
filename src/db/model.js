import { Model as BaseModel } from 'objection'
import Key from './key.js'
import knex from './knex.js'

class Model extends BaseModel {
  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    if (!this.id) {
      this.id = Key()
    }
  }
}

Model.knex(knex)

export default Model
