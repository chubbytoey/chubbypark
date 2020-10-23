'use strict'

const CustomerValidator = require("../../../service/customerValidator.js")
const Customer = use('App/Models/Customer')
const CustomerUtil = require('../../../util/CustomerUtil')

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return { error: `param: ${number} is not supported, please use number type param instead` }
    }
    return {}
}

class CustomerController {
    async index({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const { references = undefined } = request.qs

                const customerUtil = new CustomerUtil(Customer)
                const customers = await customerUtil.getAll(references)

                return { status: 200, error: undefined, data: customers || {} }
            }
        }
        catch {
            return 'only admin can acces the information'
        }
    }

    async show({ request, auth }) {
        // try {
        //     await auth.check()
        //     const user = await auth.getUser()
            const { id } = request.params
            const ValidatedValue = numberTypeParamValidator(id)
            if (ValidatedValue.error) {
                return { status: 500, error: ValidatedValue.error, data: undefined }
            }

            // if (user.status == 'admin' || user.status == 'customer' && user.account_id == id) {
                const { references } = request.qs
                const customerUtil = new CustomerUtil(Customer)
                const customers = await customerUtil.getByID(id, references)

                return { status: 200, error: undefined, data: customers || {} }
        //     } else {
        //         return 'only admin can access the information'
        //     }
        // } catch{
        //     return 'only admin can access the information'
        // }
    }

    async store({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { first_name, last_name, age, gender } = request.body
            const ValidatedData = await CustomerValidator(request.body)

            const {references} = request.qs
            if (ValidatedData.error) {
                return { status: 422, error: ValidatedData.error, data: undefined }
            }
            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const customerUtil = new CustomerUtil(Customer)
                await customerUtil.createCustomer({first_name,last_name,age,gender},references)

                return { status: 200, error: undefined, data: `created succesfully` }
            }
        } catch{
            return 'only admin can access the information'
        }
    }

    async update({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { body, params } = request
            const { id } = params
            const { account_id, first_name, last_name, age, gender, user_rate, previllage, reservation, cancel, coin } = body

            const ValidatedValue = numberTypeParamValidator(id)
            if (ValidatedValue.error)
                return { status: 500, error: ValidatedValue.error, data: undefined }

            if (user.status == 'admin' || user.status == 'customer' && user.account_id == id) {

                const customerUtil = new CustomerUtil(Customer)
                const customers = await customerUtil.updateCustomer(id, account_id, first_name, last_name, age, gender, user_rate, previllage, reservation, cancel, coin)

                return { status: 200, error: undefined, data: customers }
            } else {
                return 'only admin can access the information'
            }
        } catch{
            return 'only admin can access the information'
        }
    }
    async destroy({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const { id } = request.params

                const ValidatedValue = numberTypeParamValidator(id)
                if (ValidatedValue.error)
                    return { status: 500, error: ValidatedValue.error, data: undefined }

                const customerUtil = new CustomerUtil(Customer)
                await customerUtil.deleteCustomer(id)

                return { status: 200, error: undefined, data: { message: 'success' } }
            }
        } catch{
            return 'only admin can access the information'
        }
    }
}

module.exports = CustomerController
