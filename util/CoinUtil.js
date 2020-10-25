class CoinUtil{
  constructor(CustomerModel) {
    this._Customer = CustomerModel
  }
  async updateCoin(accountID , amount) {
    const coins = await this._Customer.findBy('account_id',accountID)
      coins.coin = coins.coin + amount
      await coins.save()

    const coinUpdate = await this._Customer.findBy('account_id',accountID)

    return coinUpdate
  }
}
module.exports = CoinUtil
