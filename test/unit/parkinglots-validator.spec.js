'use strict'

const { test } = use('Test/Suite')('Parkinglots Validator')
const parkingLotsValidator = require('../../service/parkingLotValidator')

test('should return undefined error when input correct data', async ({ assert }) => {
  const validatedData = await parkingLotsValidator({
    lot_name : "A13",
    lot_status : "avaliable",
    reserve_time : "13:00",
    checkin : "15:00",
    category_id : "1",
    location_id : "1",
    customer_id : "1"
  })
  assert.equal(validatedData.error, undefined)
})

test('should return error if input incorrect data', async ({ assert }) => {
  const validatedData = await parkingLotsValidator({
    lot_name : "AAAAAAAAAAA",
    lot_status : "avaliable",
    reserve_time : "13:00",
    checkin : "15:00",
    category_id : "a",
    location_id : "1",
    customer_id : "1"
  })
  assert.isArray(validatedData.error)
})

test('should return only one error if input incorrect data', async ({ assert }) => {
  const validatedData = await parkingLotsValidator({
    lot_name : "A13",
    lot_status : "avaliable",
    reserve_time : "13:00:00",
    checkin : "15:00:00",
    category_id : "ABC",
    location_id : "1",
    customer_id : "1"
  })
  assert.equal(validatedData.error.length , 1)
})
