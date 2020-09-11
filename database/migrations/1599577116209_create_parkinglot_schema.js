'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateParkinglotSchema extends Schema {
  up () {
    this.create('parkinglots', (table) => {
      table
        .increments('code')
      table
        .string('lot_status',12)
        .notNullable()
        .default("available")
      table
        .time('checkin')
      table
        .time('checkout')
      table
        .smallint('hour',2 )
        .default(0)
      table
        .decimal('price')
        .notNullable()
        .default(0)
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
      table
        .integer('customer_id')
        .unsigned()

      table.timestamps()

      table
        .foreign('category_id')
        .references('categories.category_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('location_id')
        .references('locations.location_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('customer_id')
        .references('customers.customer_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')


    })
  }

  down () {
    this.drop('parkinglots')
  }
}

module.exports = CreateParkinglotSchema
