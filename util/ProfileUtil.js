class ProfileUtil{
  constructor(CustomerModel) {
    this._Customer = CustomerModel
  }
  async updateProfile(accountID , Fname , Lname , Bdate , Gender) {
    const profile = await this._Customer.findBy('account_id',accountID)
      profile.first_name = Fname
      profile.last_name = Lname
      profile.birth_date = Bdate
      profile.gender = Gender

      await profile.save()

    const profileUpdate = await this._Customer.findBy('account_id',accountID)

    return profileUpdate
  }
}
module.exports = ProfileUtil
