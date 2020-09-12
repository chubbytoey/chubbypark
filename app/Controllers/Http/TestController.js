'use strict'

const Database = use('Database')

class TestController {
    async checkLogin({auth}) {
      try {
        await auth.check()
        const user = await auth.getUser()
        // const joinUser = await Database.table('customers').where('account_id',user.account_id)
        // console.log(joinUser[0].first_name)
        if (user.status == 'customer') {
          return 'user'
        } else {
          return 'admin'
        }
      } catch {
        return 'not'
      }
    }
}

module.exports = TestController


