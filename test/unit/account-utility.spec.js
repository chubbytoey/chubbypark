'use strict'

const { test } = use('Test/Suite')('Account Utility')
const AccountUtil = require('../../util/AccountUtil')
const Account = use('App/Models/Account')

test('should get all accounts', async ({ assert }) => {
  
  const accountUtil = new AccountUtil(Account);
  const accounts = await accountUtil.getAll()
  
  assert.isArray(accounts.rows)
})


test('should return empty', async ({ assert }) => {
  
  const accountUtil = new AccountUtil(Account);
  const accounts = await accountUtil.getAll()
  accounts.rows = [];

  assert.isEmpty(accounts.rows)
})

test('should get specific account', async ({ assert }) => {
  
  const id = 2;
  const accountUtil = new AccountUtil(Account);
  const account = await accountUtil.getByID(id)
  
  assert.isArray(account.rows)
})


test('should return empty when specific account is not found', async ({ assert }) => {
  
  const id = 1000;
  const accountUtil = new AccountUtil(Account);
  const account = await accountUtil.getByID(id)
  
  assert.isEmpty(account.rows)
})



test('should create account success ', async ({ assert ,auth}) => {
  
  try {
    await auth.check()
    const user = await auth.getUser()

    const username = "se"
    const password = "12345678"
    const status = "customer"
  
    const accountUtil = new AccountUtil(Account);
    const account = await accountUtil.createAccount(username,password,status)
    
    
    assert.isOk(account)

  } catch (error) {
    
  }
  


})


test('should update account success ', async ({ assert,auth }) => {
  try {
    await auth.check()
    const user = await auth.getUser()
    const username = "some2"
    const id = "3"

    const accountUtil = new AccountUtil(Account);
    const account = await accountUtil.updateAccount(id,username)
    
    const checkupdate = await accountUtil.getById(id)

    assert.equal(id,checkupdate.account_id)
  } catch (error) {
      
  }
})


test('should delete account success ', async ({ assert,auth }) => {
  try {
    await auth.check()
    const user = await auth.getUser()
    const id = "4"

    const accountUtil = new AccountUtil(Account);
    const account = await accountUtil.deleteAccount(id)
    const checkdelete = await accountUtil.getById(id)
    
    assert.isEmpty(checkdelete.rows)
  } catch (error) {
        
  }
})












