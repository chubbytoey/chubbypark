'use strict'
const Account = use('App/Models/Account')
const AccountValidator = require('../../../service/AccountValidator.js')
const RegistertUtil = require('../../../util/RegisterUtil')
class RegisterController {
    async registerAccount({request}) {
        const ValidatedData = await AccountValidator(request.body)

        const {username} = request.body
        if(ValidatedData.error)
            return {status:422 , error:ValidatedData.error , data:undefined}

        const accountUtil = new RegistertUtil(Account)
        await accountUtil.createAccount(request.body)
        return {status:200 , error:undefined , data:`${username} is created succesfully`}}
    }

module.exports = RegisterController
