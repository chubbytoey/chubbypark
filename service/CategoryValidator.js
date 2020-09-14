const Validator = use("Validator")
module.exports = async function categoryValidator(data) {
    if (typeof data !== 'object') throw new Error()

    const { type, free_hour } = data

    const rules = {
        type: 'required | string | max:20 | min:1',
        free_hour: 'required | integer | max:2'
    }

    const validation = await Validator.validateAll({ type, free_hour }, rules)

    return {
        error: validation.messages() || undefined
    }

}