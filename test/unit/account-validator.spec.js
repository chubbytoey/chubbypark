'use strict'

const { test } = use('Test/Suite')('Account Validator')
const accountValidator = require('../../service/AccountValidator')

test('should return undefined error when input correct data', async ({ assert }) => {
  const validatedData = await accountValidator({
    username : "sarang",
    password : "12345678"
  })
  assert.equal(validatedData.error,undefined)
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
    username : "sayhi",
    password : "1"
  })
  assert.equal(validatedData.error.length , 1)
})
test('should return error if input not unique username' , async ({assert}) => {
  const validatedData = await accountValidator({
    username: "chubbytoey",
    password : "12345678"
  })
  assert.isOk(validatedData.error)
})