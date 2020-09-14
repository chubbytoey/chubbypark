const Validator = use("Validator")
module.exports = async function locationValidator(data) {
    if (typeof data !== 'object') throw new Error()

    const { location_name, price_rate } = data

    const rules = {
        location_name: 'required | string | max:100 |unique:Locations,location_name',
        price_rate: 'required | number'
    }

    const validation = await Validator.validateAll({ location_name, price_rate }, rules)

    return {
        error: validation.messages() || undefined
    }

}