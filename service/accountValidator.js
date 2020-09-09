const Validator = use('Validator')
module.exports = async function accountValidator(data) {
    if(typeof data !== 'object')
        throw new Error()

    const {username,password} = data
    
    const rules = {
        username : 'required | unique:accounts,username',
        password : 'min:8 | required'
    }
    const validation = await Validator.validateAll({username,password},rules)

    return {
        error:validation.messages()
    }
}