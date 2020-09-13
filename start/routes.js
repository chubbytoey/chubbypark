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
  Route.post('/logins','AuthController.login').middleware('guest')
  Route.get('/getuser','AuthController.getUser')
  Route.get('/logins','AuthController.logout').middleware('auth')
  Route.get('/checkLogin','TestController.checkLogin')

  // RESERVATION
  Route.get('/reserve','ReserveController.show')
  Route.get('/reserve/:location_id','ReserveController.showLot')
  Route.patch('/reserve/:location_id','ReserveController.reserve')
  Route.patch('/cancel','ReserveController.cancel')
  Route.patch('/checkin','ReserveController.checkin')
  Route.patch('/checkout','ReserveController.checkout')
  
  
  //ADMIN
  Route.post('/addlot','AdminController.addlot')

  //register
  Route.post('registers','RegisterController.registerAccount')

}).prefix('api/v1')
