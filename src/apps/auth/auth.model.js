import Model from '../../db/model.js'

export class User extends Model {
  static get tableName() {
    return 'users'
  }
}
