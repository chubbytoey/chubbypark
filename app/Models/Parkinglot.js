'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parkinglot extends Model {
    static get primaryKey() {
        return 'code'
    }

    location (){
         return this.belongsToMany('App/Models/Location')
    }
    category (){
        return this.hasMany('App/Models/Category')
    }
    


}

module.exports = Parkinglot
