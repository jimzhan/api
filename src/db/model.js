import knex from 'knex'
import { Model as BaseModel } from 'objection'
import Key from './key.js'

BaseModel.knex(knex)

class Model extends BaseModel {
  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    if (!this.id) {
      this.id = Key()
    }
  }
}

export default Model
