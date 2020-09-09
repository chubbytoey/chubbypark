'use strict'

const Database = use('Database')
const Account = use('App/Models/Account')
const AccountValidator = require('../../../service/accountValidator.js')


function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number))) {
        return {error:`param: ${number} is not supported, please use number type param instead`}
    }
    return {}
}

class AccountController {
    async index({request}) {
        const {references = undefined} = request.qs

        const accounts = Account.query()
        if(references) {
            const extractedReferences = references.split(",")
            accounts.with(extractedReferences)
        }
        return {status:200 , error:undefined , data:await accounts.fetch()}
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error) {
            return {status:500 , error:ValidatedValue.error , data:undefined}
        }

        const account = await Database
            .table('accounts')
            .where('account_id',id)
            .first()

        return {status:200 , error:undefined , data:account}
    }
    async store({request}) {
        const {username,password} = request.body
        const ValidatedData = await AccountValidator(request.body)

        if(ValidatedData.error)
            return {status:422 , error:ValidatedData.error , data:undefined}

        await Account.create({username,password})
        return {status:200 , error:undefined , data:`${username} is created succesfully`}
    }
    async update({request}) {
        const {body , params} = request

        const {id} = params
        const {username} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const accountID = await Database
            .table('accounts')
            .where({account_id:id})
            .update({username})

        const account = await Database
            .table('accounts')
            .where({account_id:id})
            .first()

        return {status:200 , error:undefined , data:account}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database
            .table('accounts')
            .where({account_id:id})
            .delete()

        return {status:200 , error:undefined , data:{message:'success'}}
    }
}

module.exports = AccountController
