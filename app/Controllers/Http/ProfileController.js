"use strict";
const Customer = use("App/Models/Customer");
const Account = use("App/Models/Account");
const ProfileUtil = require("../../../util/ProfileUtil");
const AccountPicUtil = require("../../../util/AccountPicUtil");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param: ${number} is not supported, please use number type param instead`,
    };
  }
  return {};
}

class ProfileController {
  async update({ request, auth }) {
    try {
      await auth.check();
      const user = await auth.getUser();
      const { body } = request;

      const id = user.account_id;
      const { first_name, last_name, birth_date, gender } = body;

      if (
        user.status == "admin" ||
        (user.status == "customer" && user.account_id == id)
      ) {
        const profileUtil = new ProfileUtil(Customer);
        const profile = await profileUtil.updateProfile(
          id,
          first_name,
          last_name,
          birth_date,
          gender
        );

        return { status: 200, error: undefined, data: profile };
      } else {
        return { status: 500, error: "only admin can access", data: undefined };
      }
    } catch (e) {
      return { status: 500, error: e, data: undefined };
    }
  }
  async updatePic({ request, auth }) {
    try {
      await auth.check();
      const user = await auth.getUser();
      const { body } = request;

      const id = user.account_id;
      const { url } = body;

      if (
        user.status == "admin" ||
        (user.status == "customer" && user.account_id == id)
      ) {
        const accountPicUtil = new AccountPicUtil(Account);
        const account = await accountPicUtil.updateAccountPic(id, url);

        return { status: 200, error: undefined, data: account };
      } else {
        return { status: 500, error: "only admin can access", data: undefined };
      }
    } catch (e) {
      return { status: 500, error: e, data: undefined };
    }
  }
  async show({ request, auth }) {
    try {
      await auth.check();
      const user = await auth.getUser();

      const id = user.account_id;
      const ValidatedValue = numberTypeParamValidator(id);
      if (ValidatedValue.error) {
        return { status: 500, error: ValidatedValue.error, data: undefined };
      }

      if (
        user.status == "admin" ||
        (user.status == "customer" && user.account_id == id)
      ) {
        const accountPicUtil = new AccountPicUtil(Account);
        const account = await accountPicUtil.getByID(id);

        return { status: 200, error: undefined, data: account || {} };
      } else {
        return { status: 500, error: "only admin can access", data: undefined };
      }
    } catch {
      return { status: 500, error: "only admin can access", data: undefined };
    }
  }
}

module.exports = ProfileController;
