'use strict'

const { test } = use('Test/Suite')('Category Validator')
const categoryValidator = require('../../service/CategoryValidator')

test('should return undefined error when input correct data', async ({ assert }) => {
  const validatedData = await categoryValidator({
    type : "normal",
    free_hour : "2"
  })
  assert.equal(validatedData.error,undefined)
})

test('should return error if input incorrect data', async ({ assert }) => {
  const validatedData = await categoryValidator({
    type : "",
    free_hour : "toey"
  })
  assert.isArray(validatedData.error)
})
test('should return only one error if input only one incorrect data', async ({ assert }) => {
  const validatedData = await categoryValidator({
    type : "normal",
    free_hour : "555"
  })
  assert.equal(validatedData.error.length , 1)
})