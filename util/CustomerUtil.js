class CustomerUtil {
    constructor(CustomerModel) {
        this._Customer = CustomerModel
    }

    getAll(references) {
        const customers = this._Customer.query()

        if (references) {
            const extractedReferences = references.split(",")
            customers.with(extractedReferences)
        }
        return customers.fetch()
    }

    getByID(customerID, references) {
        const customers = this._Customer
            .query()
            .where('account_id', customerID)

        if (references) {
            const extractedReferences = references.split(",")
            customers.with(extractedReferences)
        }
        return customers.fetch()
    }

    async deleteCustomer(customerID) {

        const customers = await this._Customer.findBy('customer_id', customerID)
        if (!customers) {
            return { message: 'cant find data' }
        } else {
            customers.delete()
            await customers.save()
            return { message: 'delete success' }
        }
    }
    async updateCustomer(customerID, account_id, first_name, last_name, birth_date, gender, cancellation, previllage, reservation, cancel, coin) {
        const customerUpdate = await this._Customer.findBy('customer_id', customerID)
        customerUpdate.account_id = account_id
        customerUpdate.first_name = first_name
        customerUpdate.last_name = last_name
        customerUpdate.birth_date = birth_date
        customerUpdate.gender = gender
        customerUpdate.cancellation = cancellation
        customerUpdate.previllage = previllage
        customerUpdate.reservation = reservation
        customerUpdate.cancel = cancel
        customerUpdate.coin = coin
        await customerUpdate.save()

        const customers = await this._Customer.findBy('customer_id', customerID)
        return customers
    }
    async createCustomer(customerInstance, references) {
        const { customer_id } = await this._Customer.create(customerInstance)
        const customer = this._Customer
            .query()
            .where('customer_id', customer_id)

        return this._withReference(customer, references)
            .fetch()
            .then(response => response.first())
    }
    _withReference(instance, references) {
        if (references) {
            const extractedReferences = references.split(",")
            instance.with(extractedReferences)
        }
        return instance
    }
}
module.exports = CustomerUtil
