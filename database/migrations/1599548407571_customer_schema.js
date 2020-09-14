'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments('customer_id')
      table.integer('account_id').unsigned().references('account_id').inTable('accounts')
      table.string('first_name',120).notNullable()
      table.string('last_name',120).notNullable()
      table.integer('age',3).notNullable()
      table.string('gender',10).notNullable()
      table.integer('user_rate',1).default(0)
      table.string('previllage',20)
      table.integer('reservation').default(0)
      table.integer('cancle').default(0)
      table.integer('coin').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
