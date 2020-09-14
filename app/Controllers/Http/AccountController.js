'use strict'

const Account = use('App/Models/Account')
const AccountValidator = require('../../../service/AccountValidator.js')
const AccountUtil = require('../../../util/AccountUtil')

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return { error: `param: ${number} is not supported, please use number type param instead` }
    }
    return {}
}

class AccountController {
    async index({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()

            const { references = undefined } = request.qs
            if (user.status == 'customer') {
                return 'only admin can see the information'
            } else {

                const accountUtil = new AccountUtil(Account)
                const accounts = await accountUtil.getAll(references)

                return { status: 200, error: undefined, data: accounts || {} }

            }
        }
        catch {
            return 'please login as admin'
        }
    }
    async show({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { id } = request.params

            if (user.status == 'customer') {

                if (user.account_id == id) {

                    const ValidatedValue = numberTypeParamValidator(id)
                    if (ValidatedValue.error) {
                        return { status: 500, error: ValidatedValue.error, data: undefined }
                    }

                    const { references } = request.qs
                    const accountUtil = new AccountUtil(Account)
                    const accounts = await accountUtil.getByID(id, references)

                    return { status: 200, error: undefined, data: accounts || {} }

                } else {
                    return 'you can see only your own account information'
                }

            } else {

                const ValidatedValue = numberTypeParamValidator(id)
                if (ValidatedValue.error) {
                    return { status: 500, error: ValidatedValue.error, data: undefined }
                }

                const { references } = request.qs
                const accountUtil = new AccountUtil(Account)
                const accounts = await accountUtil.getByID(id, references)

                return { status: 200, error: undefined, data: accounts || {} }
            }
        }
        catch {
            return 'please login'
        }
    }
    async store({ request, auth }) {

        try {

            await auth.check()
            const user = await auth.getUser()

            if (user.status == 'admin') {
                const ValidatedData = await AccountValidator(request.body)
                const { username } = request.body
                if (ValidatedData.error)
                    return { status: 422, error: ValidatedData.error, data: undefined }

                const accountUtil = new AccountUtil(Account)
                await accountUtil.createAccount(request.body)
                return { status: 200, error: undefined, data: `${username} is created succesfully` }
            } else {
                return 'only admin can create the information'
            }
        }
        catch {
            return 'only admin can create the information'
        }
    }
    async update({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()

            const { body, params } = request
            const { id } = params
            const { username } = body

            const ValidatedValue = numberTypeParamValidator(id)
            console.log(ValidatedValue)
            if (ValidatedValue.error)
                return { status: 500, error: ValidatedValue.error, data: undefined }

            if (user.status == 'admin' || user.status == 'customer' && user.account_id == id) {

                const accountUtil = new AccountUtil(Account)
                const accounts = await accountUtil.updateAccount(id, username)
                return { status: 200, error: undefined, data: accounts }

            } else {
                return 'only admin or own account can edit the information'
            }
        } catch {
            return 'only admin or own account can edit the information'
        }

    }
    async destroy({ request, auth }) {
        const { id } = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if (ValidatedValue.error)
            return { status: 500, error: ValidatedValue.error, data: undefined }

        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'admin' || user.status == 'customer' && user.account_id == id) {
                const accountUtil = new AccountUtil(Account)
                const accounts = await accountUtil.deleteAccount(id)

                return { status: 200, error: undefined, data: { message: accounts.message } }
            } else {
                return 'only admin or own account can delete the information'
            }
        } catch {
            return 'only admin or own account can delete the information'
        }
    }
}

module.exports = AccountController
