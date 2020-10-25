const Validator = use('Validator')
module.exports = async function accountValidator(data) {
    if (typeof data !== 'object')
        throw new Error()

    const { first_name, last_name, birth_date, gender } = data

    const rules = {
        first_name: 'required | string | max:120',
        last_name: 'required | string | max:120',
        birth_date: 'required | string ',
        gender: 'required | string'
    }

    const validation = await Validator.validateAll({ first_name, last_name, birth_date, gender, cancellation: 4, previllage: 'normal', reservation: 0, cancel: 0 }, rules)

    return {
        error: validation.messages() || undefined
    }
}
