'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table
        .increments('category_id')
      table
        .string('type',20)
      table
        .smallint('hour',2)

      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CreateCategorySchema
