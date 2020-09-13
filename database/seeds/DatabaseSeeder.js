'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    const categories =  await Factory
    .model('App/Models/Category')
    .createMany(4)

    const accounts = await Factory
    .model('App/Models/Account')
    .createMany(20)

    const customers = await Factory
    .model('App/Models/Customer')
    .createMany(20)

  }
}

module.exports = DatabaseSeeder
