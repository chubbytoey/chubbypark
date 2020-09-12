const Validator = use("Validator")
module.exports = async function locationValidator (data) {
    if (typeof data !== 'object') throw new Error()

    const {location_name,price_rate,category_id} = data



    const rules = {
        location_name:'required | unique:Locations,location_name',
        price_rate:'required',
        category_id:'required'
    }


const validation =await Validator.validateAll ({
    location_name,price_rate,category_id
},rules)

return{
    error: validation.messages()
    }
    
}