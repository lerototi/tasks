
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', table =>{
      table.increments('id').primary()
      table.string('desc').notNull()
      table.dateTime('estimateAt')
      table.dateTime('doneAt')
      table.integer('userId').references('id')
        .inTable('users').notNull()
  })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('tasks')
};
