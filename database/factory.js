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
const Database = use('Database')
// const Location= use('App/Models/Location')
// const maximumLocation = Location.query("SELECT COUNT(location_id) FROM locations ")

async function getLocation(){
    return await Database.from('locations').getCount()
}
async function getCategory(){
    return await Database.from('categories').getCount()
}
async function getCustomer(){
    return await Database.from('customers').getCount()
}




Factory.blueprint('App/Models/Category', (faker) =>{
    return{
        type: faker.string(),
        free_hour: faker.hour({min:1,max:3})
    }
})

Factory.blueprint('App/Models/Location', (faker) =>{
    return{
        location_name: faker.word(),
        price_rate: faker.floating({min:0,max:100,fixed:2})
    }
})


Factory.blueprint('App/Models/Account', (faker) =>{
    return{
        username: faker.username(),
        password: faker.password({min:8})
    }
})

Factory.blueprint('App/Models/Customer', (faker) =>{
    return{
        first_name: faker.word(),
        last_name: faker.word(),
        age : faker.integer({min:1,max:3}),
        gender : faker.gender()
    }
})


Factory.blueprint('App/Models/Parkinglot', (faker) =>{
    return{
        lot_name: faker.word(),
        lot_status : faker.word(),
        reserve_time : faker.timestamp(),
        checkin: faker.timestamp(),
        customer: faker.integer({min:1,max: getCustomer()}),
        location_id: faker.integer({min:1,max:getLocation()}),
        category_id: faker.integer({min:1,max:getCategory()})
    }
})


// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })
