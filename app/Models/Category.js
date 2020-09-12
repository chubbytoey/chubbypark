'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get primaryKey(){
        return 'category_id'
    }
    
    parkinglot() {
        return this.belongsToMany('App/Models/Parkinglot')
    }
    location(){
        return this.hasMany('App/Models/Location')
    }
}

module.exports = Category
