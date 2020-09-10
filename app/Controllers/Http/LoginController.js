'use strict'
const Database = use('Database')
const Hash = use('Hash')

class LoginController {
    async login({request}) {
        const {username} = request.body
        const {password} = request.body
        const loginData = await Database.table('Accounts').where('username',username).first()
        const hashPassword = await Hash.verify(password,loginData.password)
        if(hashPassword)
        console.log(hashPassword)
        else
        console.log(hashPassword)
    }
}

module.exports = LoginController
