'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
    static get primaryKey(){
        return 'customer_id'
    }
    account() {
        return this.belongsTo('App/Models/Account')
    }
    parkinglot() {
        return this.hasOne('App/Models/Parkinglot')
    }
}

module.exports = Customer
