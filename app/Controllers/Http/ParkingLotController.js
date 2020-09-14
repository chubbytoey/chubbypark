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
            reserve_time,
            checkin,
            category_id,
            location_id,
            customer_id
        } = request.body

       const validatedData = await ParkingLotValidator(request.body)
        if (validatedData.error)
            return{status: 422,error: validatedData.error,data: undefined}
        
        const {references = undefined} =request.qs
        const parkingUtil = new ParkingLotUtil(ParkingLot)
        const parkinglot =  await parkingUtil
            .create( {
                lot_name,
                lot_status,
                reserve_time,
                checkin,
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
       
        const parkingLotsUtil = new ParkingLotUtil(ParkingLot)
        const parkingLots = await parkingLotsUtil.updateParkingLots(params,body)
        return {status:200 , error:undefined , data:parkingLots}

    }
    async destroy ({request}){
        const {id} = request.params
      
        const parkingLotsUtil = new ParkingLotUtil(ParkingLot)
        const parkingLots = await parkingLotsUtil.deleteParkingLots(id)
        return {status:200 , error:undefined , data:parkingLots}

    }


}

module.exports = ParkingLotController
