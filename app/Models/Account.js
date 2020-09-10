'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Account extends Model {
    static get primaryKey(){
        return 'account_id'
    }
    static get createdAtColumn() {
        return null
    }
    static get updatedAtColumn() {
        return null
    }
    admin() {
        return this.belongsTo('App/Models/Admin')
    }
    customer() {
        return this.belongsTo('App/Models/Customer')
    }
    static boot() {
        super.boot()
        this.addHook('beforeSave',async (accountInstance) => {
            if(accountInstance.dirty.password) {
                accountInstance.password = await Hash.make(accountInstance.dirty.password)
            }
        })
    }
}

module.exports = Account
