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
    async deleteAccount(accountID) {
        // await this._Account.table('accounts').where('account_id',accountID).delete()

        // await this._Account.findBy('account_id',accountID).delete()
        // return {message:'yes'}

        const accounts = await this._Account.findBy('account_id',accountID)
        if(!accounts) {
            return {message : 'cant find data'}
        } else{
            accounts.delete()
            await accounts.save()
            return {message : 'delete success'}
        }
    }
    async updateAccount(accountID,username) {
        const accountUpdate = await this._Account.findBy('account_id',accountID)
        accountUpdate.username = username
        await accountUpdate.save()

        const accounts = await this._Account.findBy('account_id',accountID)
        return accounts
    }
    async createAccount(username,password) {
        const account = await Account.create({username,password})
        return account
    }

}
module.exports = AccountUtil