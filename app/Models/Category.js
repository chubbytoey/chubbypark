'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get primaryKey(){
        return 'category_id'
    }
    
    parkinglot() {
        return this.hasMany('App/Models/Parkinglot')
    }
  
}

module.exports = Category
