const Validator = use("Validator")
module.exports = async function parkinglotValidator (data) {
    if (typeof data !== 'object') throw new Error()

    const {
        lot_status,
        price,
        category_id,
        location_id,
        customer_id
    } = data



    const rules = {
        lot_status:'required',
        price:'required',
        customer_id:'required',
        location_id:'required',
        category_id:'required'
    }


const validation =await Validator.validateAll ({
    lot_status,price,category_id,location_id,customer_id
},rules)

return{
    error: validation.messages()
    }
    
}