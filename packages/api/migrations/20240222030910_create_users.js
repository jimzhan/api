export function up(knex) {
  return knex.schema.createTable(tableName, table => {
    table.specificType('id', 'CHAR(26)').primary()
    table.string('username').unique()
    table.specificType('password', 'CHAR(60)')
    table.datetime('createdAt').defaultTo(knex.fn.now())
    table.datetime('updatedAt').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
