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
}
module.exports = CustomerUtil