'use strict'

const { test } = use('Test/Suite')('Customer Validator')
const customerValidator = require('../../service/CustomerValidator')

test('should receive object as first parametre', async ({ assert }) => {
  const validatedData = await accountValidator({
    username : "chubbytoey",
    password : "12345678"
  })
  assert.isOk(validatedData)
})

test('should return error if input incorrect data', async ({ assert }) => {
  const validatedData = await accountValidator({
    username : "chubbytoey",
    password : "toey"
  })
  assert.isArray(validatedData.error)
})
test('should return only one error if input incorrect password', async ({ assert }) => {
  const validatedData = await accountValidator({
    username : "chubbytoey",
    password : "toey"
  })
  assert.equal(validatedData.error.length , 1)
})
test('should return error if input not unique username' , async ({assert}) => {
  const validatedData = await accountValidator({
    username: "hihi",
    password : "12345678"
  })
  console.log(validatedData.error)
  assert.deepEqual({field:'username'},{field:'username'})
})
