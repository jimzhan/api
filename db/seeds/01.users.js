const tableName = 'users'

export const seed = async (knex) => {
  await knex(tableName).del()
  await knex(tableName).insert([
    { id: 1, colName: 'rowValue1' },
    { id: 2, colName: 'rowValue2' },
    { id: 3, colName: 'rowValue3' },
  ])
}
