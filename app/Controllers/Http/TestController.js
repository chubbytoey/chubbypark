'use strict'

const Account = use('App/Models/Account');

class TestController {
    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        user = await user.save()
        //let accessToken = await auth.generate(user)
        return "register success"
    }

    async login({request, auth, response}) {
        const {username} = request.body
        const {password} = request.body

        try {
          if (await auth.attempt(username, password)) {
            let user = await Account.findBy('username', username)

            let accessToken = await auth.generate(user)
            return response.json({"user":user, "access_token": accessToken})
          }

        }
        catch (e) {
          return response.json({message: 'You first need to register!'})
          //return e
        }
    }
}

module.exports = TestController


