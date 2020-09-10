class AccountUtil {
    constructor(AccountModel) {
        this._Account = AccountModel
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
module.exports = AccountUtil