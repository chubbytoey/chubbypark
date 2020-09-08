'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments('account_id')
      table.string('username', 20 ).notNullable().unique()
      table.string('password', 8 ).notNullable()
      table.string('status', 10 ).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema