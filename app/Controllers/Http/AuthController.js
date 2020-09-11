'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')

class AuthController {
    async login({request , auth}) {
        const {username} = request.body
        const {password} = request.body
        const user = await User.findBy('username',username)
        const hashPassword = await Hash.verify(password,user.password)
        try{
            if(hashPassword){
                const accessToken = await auth.generate(user)
                return {status:'Login success' , access:accessToken}
            }
        }
        catch{
            return 'Not login'
        }
    }
}

module.exports = AuthController
