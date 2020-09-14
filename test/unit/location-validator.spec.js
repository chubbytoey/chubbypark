'use strict'

const { test } = use('Test/Suite')('Location Validator')
const locationValidator = require('../../service/LocationValidator')

test('should return undefined error when input correct data', async ({ assert }) => {
  const validatedData = await locationValidator({
    location_name : "maya",
    price_rate : "5.5",
    category_id : "1"
  })
  assert.equal(validatedData.error,undefined)
})

test('should return error if input incorrect data', async ({ assert }) => {
  const validatedData = await locationValidator({
    location_name : "cenfest",
    price_rate : "number",
    category_id : "5.5"
  })
  assert.isArray(validatedData.error)
})

test('should return only one error if input incorrect data', async ({ assert }) => {
  const validatedData = await locationValidator({
    location_name : "maya",
    price_rate : "number",
    category_id : "5"
  })
  assert.equal(validatedData.error.length , 1)
})

test('should return error if input not unique location_name' , async ({assert}) => {
  const validatedData = await locationValidator({
    location_name : "cenfest",
    price_rate : "number",
    category_id : "5"
  })
  assert.isOk(validatedData.error)
})
