'use strict'


const ParkingLot = use('App/Models/ParkingLot')
const ParkingLotValidator = require("../../../service/ParkingLotValidator")

function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class ParkingLotController {

    async index(){
        const parkinglots = await ParkingLot.all()
        return {status: 200,error:undefined,data: parkinglots}
    }
    async show({request}){
        const {id} = request.params

        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error)
            return {status:500,error:validatedValue.error,data: undefined}
        const parkinglot = await ParkingLot.find(id)

        return {status:200,error:undefined,data: parkinglot || {}}
    }
    async store ({request}){
        const {lot_status,checkin,checkout,price,category_id,location_id,customer_id} = request.body
        const validatedData = await ParkingLotValidator(request.body)

        if (validatedData.error)
            return{status: 422,error: validatedData.error,data: undefined}
        
        const parkinglot = new ParkingLot()
            parkinglot.lot_status=lot_status;
            parkinglot.checkin =checkin;
            parkinglot.checkout = checkout;
            parkinglot.price = price;
            parkinglot.category_id = category_id;
            parkinglot.location_id =location_id;
            parkinglot.customer_id =customer_id;
        
        await parkinglot.save()


    }
    async update ({request}){
        const {body, params} = request
        const {id} = params
        const {lot_status,checkin,checkout,price,category_id,location_id,customer_id} = body
        const parkinglot = await ParkingLot.find(id)

        category.merge({
            lot_status:lot_status,
            checkin:checkin,
            checkout:checkout,
            price:price,
            category_id:category_id,
            location_id:location_id,
            customer_id:customer_id
        })
         await parkinglot.save()

    }
    async destroy ({request}){
        const {id} = request.params
        const parkinglot = await ParkingLot.find(id)
        await parkinglot.delete()
    }


}

module.exports = ParkingLotController
