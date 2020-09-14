'use strict'
const Hash = use('Hash')
const Account = use('App/Models/Account')

class AuthController {
    async login({request , auth}) {
        const {username} = request.body
        const {password} = request.body
        const user = await Account.findBy('username',username)
        try{
            const hashPassword = await Hash.verify(password,user.password)
            if(hashPassword && user.password !== null){
                const accessToken = await auth.generate(user)
                return {status:'Login success' , access:accessToken , username : user.username}
            } else {
                return 'wrong password or username'
            }
        }
        catch{
            return 'Not login'
        }
    }
    async getUser({auth}) {
        try {
            return await auth.getUser()
          } catch (error) {
            return 'Missing or invalid jwt token'
          }
    }
    // async logout({auth}) {
    //     await auth
    //         .authenticator('jwt')
    //         .revokeTokens()
        
    // }
        async logout ({ auth }) {
          const user = auth.current.user
          const token = auth.getAuthHeader()
      
          await user
            .tokens()
            .where('token', token)
            .update({ is_revoked: true })
        }
}

module.exports = AuthController
