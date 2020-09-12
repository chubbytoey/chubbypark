const Validator = use("Validator")
module.exports = async function categoryValidator (data) {
    if (typeof data !== 'object') throw new Error()

    const {type,free_hour} = data



    const rules = {
        type:'required',
        free_hour:'required'
    }


const validation =await Validator.validateAll ({
    type,free_hour
},rules)

return{
    error: validation.messages()
    }
    
}