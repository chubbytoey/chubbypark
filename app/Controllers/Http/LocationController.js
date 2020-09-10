'use strict'


const Location= use('App/Models/Location')
const LocationValidator = require("../../../service/LocationValidator")

function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class LocationController {

    async index(){
        const locations = await Location.all()
        return {status: 200,error:undefined,data: locations}
    }
    async show({request}){
        const {id} = request.params

        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error)
            return {status:500,error:validatedValue.error,data: undefined}
        const location = await Location.find(id)

        return {status:200,error:undefined,data: location || {}}
    }
    async store ({request}){
        const {location_name,price_rate,category_id} = request.body
        const validatedData = await LocationValidator(request.body)

        if (validatedData.error)
            return{status: 422,error: validatedData.error,data: undefined}
        
        const location = new Location()
            location.location_name = location_name;
            location.price_rate = price_rate;
            location.category_id = category_id;
        
        await location.save()


    }
    async update ({request}){
        const {body, params} = request
        const {id} = params
        const {location_name,price_rate,category_id} = body
        const location = await Location.find(id)

        location.merge({location_name:location_name,price_rate:price_rate,category_id:category_id})
         await location.save()

    }

    async destroy ({request}){
        const {id} = request.params
        const location = await Location.find(id)
        await location.delete()
    }


}

module.exports = LocationController
