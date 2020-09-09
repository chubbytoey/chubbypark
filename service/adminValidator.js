const Validator = use('Validator')
module.exports = async function adminValidator(data) {
    if(typeof data !== 'object')
        throw new Error()

    const {first_name,last_name} = data
    
    const rules = {
        first_name : 'required',
        last_name : 'required'
    }

    const validation = await Validator.validateAll({first_name,last_name},rules)

    return {
        error:validation.messages()
    }
}