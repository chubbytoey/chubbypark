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
  Route.get('/getuser','AuthController.getUser')
  Route.get('/logins','AuthController.logout')
  Route.get('/checkLogin','TestController.checkLogin')

  // RESERVATION
  Route.get('/reserve','ReserveController.show')
  Route.get('/reserve/:location_id','ReserveController.showLot')
  
  Route.get('/test','ReserveController.test')

  //only admin
  Route.resource('/Admins','AdminController')
  Route.get('/registers','RegisterController.index')
  Route.get('/registers/:id','RegisterController.show')
  Route.post('/addlot','AdminController.addlot')
  Route.post('/addtype','AdminController.addType')

  //user and guest

  //only user
  Route.resource('/Customers','CustomerController')
  Route.patch('/reserve/:location_id','ReserveController.reserve')
  Route.patch('/cancel','ReserveController.cancel')
  Route.patch('/checkin','ReserveController.checkin')
  Route.patch('/checkout','ReserveController.checkout')

  //admin and user
  Route.resource('/Accounts','AccountController')

  //only guest
  Route.post('/registers','RegisterController.registerAccount').middleware('guest')
  Route.post('/logins','AuthController.login').middleware('guest')

}).prefix('api/v1')
