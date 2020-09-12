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

  Route.resource('/locations','LocationController')
  Route.resource('/parkinglots','ParkinglotController')
  Route.resource('/categories','CategoryController')
  Route.resource('/Accounts','AccountController')
  Route.resource('/Customers','CustomerController')
  Route.resource('/Admins','AdminController')
  Route.post('registers','RegisterController.registerAccount')
  Route.post('/logins','AuthController.login')
  Route.get('/getuser','AuthController.getUser')
  Route.get('/logins','AuthController.logout').middleware('auth')
  Route.post('/auth/logins','TestController.login')
  Route.post('/auth/registers','TestController.register')

}).prefix('api/v1')
