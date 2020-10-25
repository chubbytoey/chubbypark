class CoinUtil{
  constructor(CustomerModel) {
    this._Customer = CustomerModel
  }
  async updateCoin(accountID , amount) {
    const coins = await this._Customer.findBy('account_id',accountID)
      coinUpdate.cancellation = coinUpdate.cancellation + amount
      await coinUpdate.save()

    const coinUpdate = await this._Customer.findBy('account_id',accountID)

    return coinUpdate
  }
}
