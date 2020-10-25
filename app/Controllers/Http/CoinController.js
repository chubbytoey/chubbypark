"use strict";
const Customer = use('App/Models/Customer');
const CoinUtil = require('../../../util/CoinUtil');

class CoinController {
  async updateCoin({ request, auth }) {
    // const { id } = request.params;
    const { amount } = request.body
    await auth.check();
    const user = await auth.getUser()
    const id = user.account_id
    try {
      const coinUtil = new CoinUtil(Customer)
      const coins = await coinUtil.updateCoin(id, amount)
      return { status: 200, error: undefined, data: coins.coin }
    } catch {
      return { status: 500, error: "can't update coin", data: undefined };
    }
  }
}

module.exports = CoinController;
