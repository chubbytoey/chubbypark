'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  // CRUD ROUTE
  Route.resource('/locations','LocationController')
  Route.resource('/parkinglots','ParkinglotController')
  Route.resource('/categories','CategoryController')
  Route.resource('/Accounts','AccountController')
  Route.resource('/Customers','CustomerController')
  Route.resource('/Admins','AdminController')
  // LOGIN & REGISTER
  Route.post('/logins','AuthController.login')
  Route.post('/auth/logins','TestController.login')
  Route.post('/auth/registers','TestController.register')

  // RESERVATION
  Route.get('/reserve','ReserveController.show')
  Route.get('/reserve/:location_id/locations','ReserveController.showLot')
  Route.put('/reserve/:id','ReserveController.reserve')
  Route.delete('/reserve/:id','ReserveController.cancel')
  Route.patch('/reserve/checkin/:id','ReserveController.checkin')
  Route.patch('/reserve/checkout/:id','ReserveController.checkout')
  
  //ADMIN
  Route.post('/addlot','AdminController.addlot')






}).prefix('api/v1')
