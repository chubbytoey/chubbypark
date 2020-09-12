'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Location extends Model {
    static get primaryKey(){
        return 'location_id'
    }
    parkinglot(){
        return this.hasMany('App/Models/Parkinglot')
    }
    
}

module.exports = Location
