class RegisterUtil {
    constructor(AccountModel) {
        this._Account = AccountModel
    }

    async createAccount(request) {
        const {username,password,first_name,last_name,birth_date,gender} = request
        const account = await this._Account.create({username,password})
        await account.customer()
            .create({first_name,last_name,birth_date,gender,cancellation:'0',previllage:'normal',reservation:'0',cancel:'0',coin:'0'})

        return {message:'ok'}
    }
    getAll(references) {
        const accounts = this._Account.query()

        if(references) {
            const extractedReferences = references.split(",")
            accounts.with(extractedReferences)
        }
        return accounts.fetch()
    }
    getByID(accountID , references) {
        const accounts = this._Account
        .query()
        .where('account_id',accountID)

        if(references) {
            const extractedReferences = references.split(",")
            accounts.with(extractedReferences)
        }
        return accounts.fetch()
    }
}
module.exports = RegisterUtil
