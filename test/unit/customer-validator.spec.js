'use strict'

const { test } = use('Test/Suite')('Customer Validator')
const customerValidator = require('../../service/CustomerValidator')

test('should return undefined error when input correct data', async ({ assert }) => {
  const validatedData = await customerValidator({
    first_name: "ramita",
    last_name: "12345678",
    age: "3",
    gender: "male"
  })
  assert.isOk(validatedData)
})

test('should return error if input incorrect data', async ({ assert }) => {
  const validatedData = await customerValidator({
    first_name : "chubby",
    last_name: "12345678",
    age : "wow",
    gender: "male"
  })
  assert.isArray(validatedData.error)
})
test('should return only one error if input only one incorrect data', async ({ assert }) => {
  const validatedData = await customerValidator({
    first_name: "ramita",
    last_name : "saro",
    age: "3",
    gender: "male"
  })
  assert.equal(validatedData.error.length, 1)
})
