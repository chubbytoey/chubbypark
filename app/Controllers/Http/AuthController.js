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
                return {status:500 , error:'wrong password or username' , data:undefined}
            }
        }
        catch{
            return {status:500 , error:'sth happaned' , data:undefined}
        }
    }
}

module.exports = AuthController
