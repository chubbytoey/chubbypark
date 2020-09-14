const Validator = use('Validator')
module.exports = async function accountValidator(data) {
    if (typeof data !== 'object')
        throw new Error()

    const { first_name, last_name, age, gender } = data

    const rules = {
        first_name: 'required | string | max:120',
        last_name: 'required | string | max:120',
        age: 'required | integer | max:3',
        gender: 'required | string'
    }

    const validation = await Validator.validateAll({ first_name, last_name, age, gender, user_rate: 0, previllage: 'normal', reservation: 0, cancle: 0 }, rules)

    return {
        error: validation.messages() || undefined
    }
}