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

    async deleteCustomer(accountID) {
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
    async updateCustomer(customerID,account_id,first_name,last_name,age,gender,user_rate,previllage,reservation,cancle,coin) {
        const customerUpdate = await this._Customer.findBy('customer_id',customerID)
        customerUpdate.account_id = account_id
        customerUpdate.first_name = first_name
        customerUpdate.last_name = last_name
        customerUpdate.age = age
        customerUpdate.gender = gender
        customerUpdate.user_rate = user_rate
        customerUpdate.previllage = previllage
        customerUpdate.reservation = reservation
        customerUpdate.cancle = cancle
        customerUpdate.coin =coin
        await customerUpdate.save()

        const customers = await this._Customer.findBy('customer_id',customerID)
        return customers
    }
}
module.exports = CustomerUtil