import { Model } from '../../db'

export class User extends Model {
  static get tableName() {
    return 'users'
  }
}
