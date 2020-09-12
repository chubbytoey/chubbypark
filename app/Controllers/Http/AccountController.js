'use strict'

const Database = use('Database')
const Account = use('App/Models/Account')
const AccountValidator = require('../../../service/AccountValidator.js')
const AccountUtil = require('../../../util/AccountUtil')

function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number))) {
        return {error:`param: ${number} is not supported, please use number type param instead`}
    }
    return {}
}

class AccountController {
    async index({request,auth}) {
        // try {
        // await auth.check()
        const {references = undefined} = request.qs

        const accountUtil = new AccountUtil(Account)
        const accounts = await accountUtil.getAll(references)

        return {status:200 , error:undefined , data:accounts || {}}
        // }
        // catch {
            // return 'here'
        // }
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error) {
            return {status:500 , error:ValidatedValue.error , data:undefined}
        }

        const {references} = request.qs
        const accountUtil = new AccountUtil(Account)
        const accounts = await accountUtil.getByID(id,references)

        return {status:200 , error:undefined , data:accounts || {}}
    }
    async store({request}) {
        const ValidatedData = await AccountValidator(request.body)

        const {username} = request.body
        if(ValidatedData.error)
            return {status:422 , error:ValidatedData.error , data:undefined}

        const accountUtil = new AccountUtil(Account)
        await accountUtil.createAccount(request.body)
        // await Account.create({username,password})
        return {status:200 , error:undefined , data:`${username} is created succesfully`}
    }
    async update({request}) {
        const {body , params} = request

        const {id} = params
        const {username} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const accountUtil = new AccountUtil(Account)
        const accounts = await accountUtil.updateAccount(id,username)
        // const accountID = await Database
        //     .table('accounts')
        //     .where({account_id:id})
        //     .update({username})

        // const account = await Database
        //     .table('accounts')
        //     .where({account_id:id})
        //     .first()

        return {status:200 , error:undefined , data:accounts}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        // await Database
        //     .table('accounts')
        //     .where({account_id:id})
        //     .delete()
        const accountUtil = new AccountUtil(Account)
        const accounts = await accountUtil.deleteAccount(id)

        return {status:200 , error:undefined , data:{message:accounts.message}}
    }
}

module.exports = AccountController
