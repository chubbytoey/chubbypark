class AccountPicUtil {
  constructor(AccountModel) {
    this._Account = AccountModel;
  }
  async updateAccountPic(accountID,urldata) {
    const account = await this._Account.findBy("account_id", accountID);
    account.url = urldata;
    account.save();

    const accountPicUpdate = await this._Account.findBy("account_id", accountID);
    return accountPicUpdate
  }
  getByID(accountID , references) {
    const accounts = this._Account
    .query()
    .where('account_id',accountID)

    return accounts.fetch()
}
}

module.exports = AccountPicUtil
