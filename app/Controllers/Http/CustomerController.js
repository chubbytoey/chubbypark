'use strict'

const CustomerValidator = require("../../../service/CustomerValidator.js")
const Customer = use('App/Models/Customer')
const CustomerUtil = require('../../../util/CustomerUtil')

function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number))) {
        return {error:`param: ${number} is not supported, please use number type param instead`}
    }
    return {}
}

class CustomerController {
    async index({request}) {
        const {references = undefined} = request.qs

        const customerUtil = new CustomerUtil(Customer)
        const customers = await customerUtil.getAll(references)

        return {status:200 , error:undefined , data:customers || {}}
    }

    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error) {
            return {status:500 , error:ValidatedValue.error , data:undefined}
        }

        const {references} = request.qs
        const customerUtil = new CustomerUtil(Customer)
        const customers = await customerUtil.getByID(id,references)

        return {status:200 , error:undefined , data:customers || {}}
    }

    async store({request}) {
        const {first_name,last_name,age,gender} = request.body
        const ValidatedData = await CustomerValidator(request.body)
        console.log('hoo')

        if(ValidatedData.error) {
            return {status:422 , error:ValidatedData.error , data:undefined}
        }

        await Customer.create({first_name,last_name,age,gender,user_rate:0,previllage:'normal',reservation:0,cancle:0})

        return {status:200 , error:undefined , data:`created succesfully`}
    }

    async update({request}) {
        const {body , params} = request

        const {id} = params
        const {account_id,first_name,last_name,age,gender,user_rate,previllage,reservation,cancle,coin} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const customerUtil = new CustomerUtil(Customer)
        const customers = await customerUtil.updateCustomer(id,account_id,first_name,last_name,age,gender,user_rate,previllage,reservation,cancle,coin)
        // const customerID = await Database
        //     .table('customers')
        //     .where({customer_id:id})
        //     .update({first_name,last_name,age,gender})

        // const customer = await Database
        //     .table('customers')
        //     .where({customer_id:id})
        //     .first()

        return {status:200 , error:undefined , data:customers}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        const customerUtil = new CustomerUtil(Customer)
        await customerUtil.deleteCustomer(id)

        return {status:200 , error:undefined , data:{message:'success'}}
    }
}

module.exports = CustomerController
