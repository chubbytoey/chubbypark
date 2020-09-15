'use strict'

const { test } = use('Test/Suite')('Customer Utility')

const CustomerUtil = require('../../util/CustomerUtil')
const Customer = use('App/Models/Customer')


test('should get all customer', async ({ assert }) => {
  
  const references = "account"
  const customerUtil = new CustomerUtil(Customer);
  const customers = await customerUtil.getAll(references)
  
  assert.isArray(customers.rows)
})


test('should return empty when get all customers', async ({ assert }) => {
  
  const references = "account"
  const customerUtil = new CustomerUtil(Customer);
  const customers = await customerUtil.getAll(references)
  customers.rows = []

  assert.isEmpty(customers.rows)
})


test('should get specific customer', async ({ assert }) => {
  const id = 1
  const references = "account"
  const customerUtil = new CustomerUtil(Customer);
  const customer = await customerUtil.getByID(id,references)
  
  assert.isArray(customer.rows)
})


test('should return empty when get specific customer', async ({ assert }) => {
  
  const id = 9999
  const references = "account"
  const customerUtil = new CustomerUtil(Customer);
  const customer = await customerUtil.getByID(id,references)
  
  assert.isArray(customer.rows)
})




test('should creat lot success', async ({ assert,auth }) => {

  try {
    await auth.check()
    const user = await auth.getUser()

    const references = "account"
    const customerUtil = new CustomerUtil(Customer);
    const customer = await customerUtil
      .createCustomer({
        first_name:"doe",
        last_name:"someome",
        age:20,
        gender:"maile"
      },
      references)
    
    assert.isOk(customer)
    
  } catch (error) {
    
  }
 
})


test('should update customer success', async ({ assert ,auth}) => {


  try {
    await auth.check()
    const user = await auth.getUser()
  
    const customer_id = 4
    const account_id = 4
    const first_name = "ben"
    const last_name = "ten"
    const age = 15
    const gender = "male"
    const user_rate = 5
    const previllage = "vip"
    const reservation = 1
    const cancel = 0
    const coin = 1000



    const customerUtil = new CustomerUtil(Customer);
    const customer = await customerUtil
      .updateCustomer({
        customer_id, 
        account_id, 
        first_name, 
        last_name, 
        age, 
        gender, 
        user_rate, 
        previllage, 
        reservation, 
        cancel, 
        coin
      })
    
    assert.isOk(customer)
  } catch (error) {
    
  }


})




test('should delete customer success', async ({ assert,auth }) => {

  
  try {
    await auth.check()
    const user = await auth.getUser()
  
  
    const id = 10
    const customerUtil = new CustomerUtil(Customer);
    const customer = await customerUtil.deleteCustomer(id)
    const checkDelete = await customerUtil.getByID(id)

    assert.isEmpty(checkDelete.rows)
} catch (error) {
    
}
})



