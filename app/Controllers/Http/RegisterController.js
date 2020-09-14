'use strict'
const Account = use('App/Models/Account')
const AccountValidator = require('../../../service/AccountValidator.js')
const RegistertUtil = require('../../../util/RegisterUtil')

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return { error: `param: ${number} is not supported, please use number type param instead` }
    }
    return {}
}

class RegisterController {
    async registerAccount({ request }) {
        const ValidatedData = await AccountValidator(request.body)

        const { username } = request.body
        if (ValidatedData.error)
            return { status: 422, error: ValidatedData.error, data: undefined }

        const accountUtil = new RegistertUtil(Account)
        await accountUtil.createAccount(request.body)
        return { status: 200, error: undefined, data: `${username} is created succesfully` }
    }


    async index({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { references = undefined } = request.qs

            if (user.status == 'customer') {
                return 'only admin can see the information'
            } else {

                const accountUtil = new RegistertUtil(Account)
                const accounts = await accountUtil.getAll(references)

                return { status: 200, error: undefined, data: accounts || {} }
            }
        }
        catch {
            return 'here'
        }
    }
    async show({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { id } = request.params

            const ValidatedValue = numberTypeParamValidator(id)
            if (ValidatedValue.error) {
                return { status: 500, error: ValidatedValue.error, data: undefined }
            }
            if (user.status == 'customer') {
                return 'only admin can see the information'
            } else {

                const { references } = request.qs
                const accountUtil = new RegistertUtil(Account)
                const accounts = await accountUtil.getByID(id, references)

                return { status: 200, error: undefined, data: accounts || {} }
            }
        }
        catch {
            return 'here'
        }
    }
}
module.exports = RegisterController
