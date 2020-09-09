'use strict'

const CustomerValidator = require("../../../service/customerValidator.js")
const Database = use('Database')
const Customer = use('App/Models/Customer')

function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number))) {
        return {error:`param: ${number} is not supported, please use number type param instead`}
    }
    return {}
}

class CustomerController {
    async index({request}) {
        const {references = undefined} = request.qs

        const Customers = Customer.query()
        if(references) {
            const extractedReferences = references.split(",")
            Customers.with(extractedReferences)
        }

        return {status:200 , error:undefined , data:await Customers.fetch()}
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error) {
            return {status:500 , error:ValidatedValue.error , data:undefined}
        }

        const customer = await Database
            .table('customers')
            .where('customer_id',id)
            .first()

        return {status:200 , error:undefined , data:customer}
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
        const {first_name,last_name,age,gender} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const customerID = await Database
            .table('customers')
            .where({customer_id:id})
            .update({first_name,last_name,age,gender})

        const customer = await Database
            .table('customers')
            .where({customer_id:id})
            .first()

        return {status:200 , error:undefined , data:customer}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database
            .table('customers')
            .where({customer_id:id})
            .delete()

        return {status:200 , error:undefined , data:{message:'success'}}
    }
}

module.exports = CustomerController
