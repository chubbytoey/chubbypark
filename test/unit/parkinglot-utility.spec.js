'use strict'

const { test } = use('Test/Suite')('Parkinglot Utility')

const ParkingUtil = require('../../util/parkinglotUtil')
const Parkinglot = use('App/Models/Parkinglot')


test('should get all parkinglot', async ({ assert }) => {
  
  const references = "category,location,customer"
  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil.getAll(references)
  
  assert.isArray(parkinglots.rows)
})


test('should return empty when get all parkinglot', async ({ assert }) => {
  
  const references = "category,location"
  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil.getAll(references)
  parkinglots.rows = []

  assert.isEmpty(parkinglots.rows)
})


test('should get specific parkinglot', async ({ assert }) => {
  const id = 1
  const references = "category,location"
  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil.getByID(id,references)
  
  assert.isArray(parkinglots.rows)
})


test('should return empty when get specific parkinglot', async ({ assert }) => {
  
  const id = 9999
  const references = "category,location"
  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil.getByID(id,references)
  

  assert.isEmpty(parkinglots.rows)
})




test('should creat lot success', async ({ assert }) => {

  
  const references = "category,location"
  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil
    .create({
      lot_name:"X99",
      lot_status:"available",
      reserve_time:"12:00:00",
      checkin:"12:30:00",
      category_id:10,
      location_id:1,
      customer_id:1
    },
    references)
  
  assert.isOk(parkinglots)
})


test('should update lot success', async ({ assert }) => {

 const parkinglot_id=5
 const lot_name="625"
 const lot_status="unavailable"
 const reserve_time="8:00:00"
 const checkin="9:00:00"
 const category_id=10
 const location_id=1
 const customer_id=1



  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil
    .updateParkingLots(
      parkinglot_id,
      lot_name,
      lot_status,
      reserve_time,
      checkin,
      category_id,
      location_id,
      customer_id
    )
  
  assert.isOk(parkinglots)
})




test('should delete lot success', async ({ assert }) => {
  
  const id = 10
  const parkinglotUtil = new ParkingUtil(Parkinglot);
  const parkinglots = await parkinglotUtil.deleteParkingLots(id)
  const checklot = await parkinglotUtil.getByID(id)

  assert.isEmpty(checklot.rows)
})



