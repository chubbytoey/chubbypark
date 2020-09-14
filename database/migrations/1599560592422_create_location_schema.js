'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateLocationSchema extends Schema {
  up() {
    this.create('locations', (table) => {
      table
        .increments('location_id')
      table
        .string('location_name', 100)
        .notNullable()
        .unique()
      table
        .float('price_rate')

      table.timestamps()



    })
  }

  down() {
    this.drop('locations')
  }
}

module.exports = CreateLocationSchema
