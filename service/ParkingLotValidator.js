const Validator = use("Validator")
module.exports = async function parkinglotValidator(data) {
    if (typeof data !== 'object') throw new Error()

    const {
        lot_name,
        lot_status,
        reserve_time,
        checkin,
        category_id,
        location_id,
        customer_id
    } = data

    const rules = {
        lot_name: 'required | string | max:5',
        lot_status: 'required | max:12 | string',
        reserve_time: 'required',
        checkin: 'required',
        customer_id: 'required | integer',
        location_id: 'required | integer',
        category_id: 'required | integer'
    }

    const validation = await Validator.validateAll({
        lot_name,
        lot_status,
        reserve_time,
        checkin,
        category_id,
        location_id,
        customer_id
    }, rules)

    return {
        error: validation.messages() || undefined
    }

}