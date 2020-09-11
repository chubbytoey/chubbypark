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
    .createMany(3)

    const locations =  await Factory
    .model('App/Models/Location')
    .createMany(10)

    const parkinglots =  await Factory
    .model('App/Models/Parkinglot')
    .createMany(20)



  }
}

module.exports = DatabaseSeeder
