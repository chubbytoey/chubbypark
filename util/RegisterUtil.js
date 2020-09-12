class RegisterUtil {
    constructor(RegisterModel) {
        this._Register = RegisterModel
    }

    async createAccount(request) {
        const {username,password,first_name,last_name,age,gender} = request
        const account = await this._Register.create({username,password})
        await account.customer().create({first_name,last_name,age,gender,user_rate:'0',previllage:'normal',reservation:'0',cancle:'0'})

        return {message:'ok'}
    }
}
module.exports = RegisterUtil