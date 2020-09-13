'use strict'


const ParkingLot = use('App/Models/Parkinglot')
const ParkingLotValidator = require("../../../service/ParkingLotValidator")
const ParkingLotUtil = require("../../../util/parkinglotUtil")


function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class ParkingLotController {

    async index({request}){
        const {references = undefined} =request.qs
        const parkingUtil = new ParkingLotUtil(ParkingLot)
        const parkinglots =  await parkingUtil.getAll(references)

        return {
            status: 200,
            error:undefined,
            data: parkinglots
        }
    }
    async show({request}){
        const {id} = request.params

        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error)
            return {status:500,error:validatedValue.error,data: undefined}

        const {references = undefined} =request.qs
        const parkingUtil = new ParkingLotUtil(ParkingLot)
        const parkinglot =  await parkingUtil.getById(id,references)

        return {status:200,error:undefined,data: parkinglot || {}}
    }
    async store ({request}){

        const {
            lot_name,
            lot_status,
            checkin,
            checkout,
            price,
            use_hour,
            category_id,
            location_id,
            customer_id
        } = request.body
 cata = await ParkingLotValidator(request.body)

        if (validatedData.error)
            return{status: 422,error: validatedData.error,data: undefined}
        
        const {references = undefined} =request.qs
        const parkingUtil = new ParkingLotUtil(ParkingLot)
        const parkinglot =  await parkingUtil
            .create( {
                lot_name,
                lot_status,
                checkin,
                checkout,
                price,
                category_id,
                location_id,
                customer_id
            },
                references
            )
        
        await parkinglot.save()


    }
    async update ({request}){
        const {body, params} = request
        const {id} = params
        const {
            lot_name,
            lot_status,
            checkin,
            checkout,
            price,
            use_hour,
            category_id,
            location_id,
            customer_id
        } = body
        // const parkinglot = await ParkingLot.find(id)

        // category.merge({
        //     lot_name:lot_name,
        //     lot_status:lot_status,
        //     checkin:checkin,
        //     checkout:checkout,
        //     price:price,
        //     use_hour:use_hour,
        //     category_id:category_id,
        //     location_id:location_id,
        //     customer_id:customer_id
        // })
        //  await parkinglot.save()
        const parkingLotsUtil = new ParkingLotUtil(ParkingLot)
        const parkingLots = await parkingLotsUtil.updateParkingLots(params,body)
        return {status:200 , error:undefined , data:parkingLots}

    }
    async destroy ({request}){
        const {id} = request.params
        // const parkinglot = await ParkingLot.find(id)
        // await parkinglot.delete()
        const parkingLotsUtil = new ParkingLotUtil(ParkingLot)
        const parkingLots = await parkingLotsUtil.deleteParkingLots(id)
        return {status:200 , error:undefined , data:parkingLots}

    }


}

module.exports = ParkingLotController
