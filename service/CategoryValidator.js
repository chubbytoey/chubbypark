const Validator = use("Validator")
module.exports = async function categoryValidator (data) {
    if (typeof data !== 'object') throw new Error()

    const {type,hour} = data



    const rules = {
        type:'required',
        hour:'required'
    }


const validation =await Validator.validateAll ({
    type,hour
},rules)

return{
    error: validation.messages()
    }
    
}