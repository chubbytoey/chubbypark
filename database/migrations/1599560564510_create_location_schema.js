'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateLocationSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table
        .increments('location_id')
      table
        .string('location_name',100)
        .notNullable()
      table
        .decimal('price_rate')
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
      table.timestamps()

      table
        .foreign('category_id')
        .references('categories.category_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')


    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = CreateLocationSchema
