class CustomerUtil {
    constructor(CustomerModel) {
        this._Customer = CustomerModel
    }

    getAll(references) {
        const customers = this._Customer.query()

        if(references) {
            const extractedReferences = references.split(",")
            customers.with(extractedReferences)
        }
        return customers.fetch()    
    }
    getByID(customerID , references) {
        const customers = this._Customer
        .query()
        .where('customer_id',customerID)

        if(references) {
            const extractedReferences = references.split(",")
            customers.with(extractedReferences)
        }
        return customers.fetch()    
    }
    async deleteUser(accountID) {
        // await this._Account.table('accounts').where('account_id',accountID).delete()

        // await this._Account.findBy('account_id',accountID).delete()
        // return {message:'yes'}

        const accounts = await this._Account.findBy('account_id',accountID)
        if(!accounts) {
            return {message : 'cant find data'}
        } else{
            accounts.delete()
            await accounts.save()
            return {message : 'delete success'}
        }
    }
    async updateAccount(accountID,username) {
        const accountUpdate = await this._Account.findBy('account_id',accountID)
        accountUpdate.username = username
        accountUpdate.save()

        const accounts = await this._Account.findBy('account_id',accountID)
        return accounts
    }
}
module.exports = CustomerUtil