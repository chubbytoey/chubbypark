'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
      // table.increments('customer_id')
      // table.integer('account_id').unsigned().references('account_id').inTable('Accounts')
      // table.string('first_name',120).notNullable()
      // table.string('last_name',120).notNullable()
      // table.integer('age',3).notNullable()
      // table.string('gender',10).notNullable()
      // table.integer('user_rate',1).default(0)
      // table.string('previllage',20)
      // table.integer('reservation').default(0)
      // table.integer('cancle').default(0)
      // table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema