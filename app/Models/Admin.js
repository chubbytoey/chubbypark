'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Admin extends Model {
    static get primaryKey(){
        return 'admin_id'
    }
    account() {
        return this.belongsTo('App/Models/Account')
    }
}

module.exports = Admin
