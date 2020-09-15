'use strict'

const { test } = use('Test/Suite')('Category Utility')
const CategoryUtil = require('../../util/categoryUtil')
const Category = use('App/Models/Category')

test('should get all categories', async ({ assert }) => {
  
  const categoryUtil = new CategoryUtil(Category);
  const categories = await categoryUtil.getAll()
  
  assert.isArray(categories.rows)
})


test('should return empty', async ({ assert }) => {
  
  const categoryUtil = new CategoryUtil(Category);
  const categories = await categoryUtil.getAll()
  categories.rows = [];

  assert.isEmpty(categories.rows)
})

test('should get specific category', async ({ assert }) => {
  
  const id = 1;
  const categoryUtil = new CategoryUtil(Category);
  const category = await categoryUtil.getById(id)
  
  assert.isArray(category.rows)
})


test('should return empty when specific category is not found', async ({ assert }) => {
  
  const id = 1000;
  const categoryUtil = new CategoryUtil(Category);
  const category = await categoryUtil.getById(id)
  
  assert.isEmpty(category.rows)
})



test('should create category success ', async ({ assert }) => {
  
  const type = "something"
  const free_hour = 3

  const categoryUtil = new CategoryUtil(Category);
  const category = await categoryUtil.create({type,free_hour})
  
  
  assert.isOk(category)
})


test('should update category success ', async ({ assert }) => {
  
  const type = "something"
  const free_hour = 3
  const id = 10

  const categoryUtil = new CategoryUtil(Category);
  const category1 = await categoryUtil.updateCategory(id,{type,free_hour})
  const category2 = await categoryUtil.getById(id)

  assert.equal(category1.id,category2.categoty_id)
})


test('should delete category success ', async ({ assert }) => {
  
  const id = 16

  const categoryUtil = new CategoryUtil(Category);
  const category1 = await categoryUtil.deleteCategory(id)
  const category2 = await categoryUtil.getById(id)
  console.log(category2)
  assert.isEmpty(category2.rows)
})












