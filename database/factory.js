'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// const Location= use('App/Models/Location')
// const maximumLocation = Location.query("SELECT COUNT(location_id) FROM locations ")


Factory.blueprint('App/Models/Category', (faker) =>{
    return{
        type: faker.string(),
        hour: faker.hour({min:1,max:3})
    }
})

Factory.blueprint('App/Models/Location', (faker) =>{
    return{
        location_name: faker.string(),
        price_rate: faker.floating({min:0,max:100,fixed:2}),
        category_id: faker.integer({min:1,max:3})
    }
})

Factory.blueprint('App/Models/Parkinglot', (faker) =>{
    return{
        location_id: faker.integer({min:1,max:3}),
        category_id: faker.integer({min:1,max:3})
    }
})


// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })
