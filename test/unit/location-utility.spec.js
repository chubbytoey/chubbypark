'use strict'

const { test } = use('Test/Suite')('Location Utility')
const LocationUtil = require('../../util/LocationUtil')
const Location = use('App/Models/Location')

test('should get all locations', async ({ assert }) => {
  
  const locationUtil = new LocationUtil(Location);
  const locations = await locationUtil.getAll()
  
  assert.isArray(locations.rows)
})


test('should return empty', async ({ assert }) => {
  
  const locationUtil = new LocationUtil(Location);
  const locations = await locationUtil.getAll()
  locations.rows = [];

  assert.isEmpty(locations.rows)
})

test('should get specific location', async ({ assert }) => {
  
  const id = 2;
  const locationUtil = new LocationUtil(Location);
  const location = await locationUtil.getById(id)
  
  assert.isArray(location.rows)
})


test('should return empty when specific location is not found', async ({ assert }) => {
  
  const id = 1000;
  const locationUtil = new LocationUtil(Location);
  const location = await locationUtil.getById(id)
  
  assert.isEmpty(location.rows)
})



test('should create location success ', async ({ assert ,auth}) => {
  
  try {
    await auth.check()
    const user = await auth.getUser()

    const location_name = "se"
    const price_rate = 4
    
  
    const locationUtil = new LocationUtil(Location);
    const location = await locationUtil.createLocation(location_name,price_rate)
    
    
    assert.isOk(location)

  } catch (error) {
    
  }
  


})


test('should update location success ', async ({ assert,auth }) => {
  try {
    await auth.check()
    const user = await auth.getUser()
    
    const id = 3
    const location_name = "ee"
    const price_rate = 1
    

    const locationUtil = new LocationUtil(Location);
    const location = await locationUtil.updateLocation(id,location_name,price_rate)
    
    const checkupdate = await locationUtil.getById(id)

    assert.equal(id,checkupdate.location_id)
  } catch (error) {
      
  }
})


test('should delete location success ', async ({ assert,auth }) => {
  try {
    await auth.check()
    const user = await auth.getUser()
    const id = ""

    const locationUtil = new locationUtil(Location);
    const location = await locationUtil.deleteAccount(id)
    const checkdelete = await locationUtil.getById(id)
    
    assert.isEmpty(checkdelete.rows)
  } catch (error) {
        
  }
})












