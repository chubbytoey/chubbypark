const Validator = use('Validator')
module.exports = async function accountValidator(data) {
    if (typeof data !== 'object')
        throw new Error()

    const { username, password ,status } = data

    const rules = {
        username: 'required | unique:accounts,username',
        password: 'min:8 | required',
        status: 'required | string'
    }
    const validation = await Validator.validateAll({ username, password,status }, rules)

    return {
        error: validation.messages() || undefined
    }
}