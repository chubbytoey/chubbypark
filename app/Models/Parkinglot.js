'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parkinglot extends Model {
    static get primaryKey() {
        return 'parkinglot_id'
    }

    location (){
         return this.belongsTo('App/Models/Location')
    }
    category (){
        return this.belongsTo('App/Models/Category')
    }
    customer() {
        return this.belongsTo('App/Models/Customer')
    }


}

module.exports = Parkinglot
