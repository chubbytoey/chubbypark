'use strict'


const ParkingLot = use('App/Models/Parkinglot')
const ParkingLotValidator = require("../../../service/ParkingLotValidator")
const ParkingLotUtil = require("../../../util/parkinglotUtil")


function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class ParkingLotController {

    async index({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { references = undefined } = request.qs

            if (user.status == 'customer') {
                return {status:500 , error:'only admin can access' , data:undefined}
            } else {
                const parkingUtil = new ParkingLotUtil(ParkingLot)
                const parkinglots = await parkingUtil.getAll(references)

                return {
                    status: 200,
                    error: undefined,
                    data: parkinglots
                }
            }
        } catch{
            return {status:500 , error:'only admin can access' , data:undefined}
        }
    }
    async show({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { id } = request.params
            const validatedValue = numberTypeParamValidator(id)

            if (validatedValue.error)
                return { status: 500, error: validatedValue.error, data: undefined }

            const { references = undefined } = request.qs

            if (user.status == 'customer') {

                return {status:500 , error:'only admin can access' , data:undefined}
            } else {

                const parkingUtil = new ParkingLotUtil(ParkingLot)

                const parkinglot = await parkingUtil.getByID(id, references)

                return { status: 200, error: undefined, data: parkinglot || {} }
            }
        } catch{
            return {status:500 , error:'only admin can access' , data:undefined}
        }
    }
    async store({ request ,auth}) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const validatedData = await ParkingLotValidator(request.body)

            const {references} = request.qs
            if (validatedData.error)
                return { status: 422, error: validatedData.error, data: undefined }

            // const {
            //     lot_name,
            //     lot_status,
            //     reserve_time,
            //     checkin,
            //     category_id,
            //     location_id,
            //     customer_id
            // } = request.body

            if (user.status == 'customer') {
                return {status:500 , error:'only admin can access' , data:undefined}
            } else {
                const parkingUtil = new ParkingLotUtil(ParkingLot)
                const parkingLots = await parkingUtil.createParkingLots(request.body,references)

                return {status:200 , error:undefined , data:parkingLots}
            }
        } catch{
            return {status:500 , error:'only admin can access' , data:undefined}
        }
    }
    async update({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { body, params } = request

            if (user.status == 'customer') {
                return {status:500 , error:'only admin can access' , data:undefined}
            } else {

                const parkingLotsUtil = new ParkingLotUtil(ParkingLot)
                const parkingLots = await parkingLotsUtil.updateParkingLots(params, body)
                return { status: 200, error: undefined, data: parkingLots }
            }
        } catch{
            return {status:500 , error:'only admin can access' , data:undefined}
        }
    }
    async destroy({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { id } = request.params

            if (user.status == 'customer') {
                return {status:500 , error:'only admin can access' , data:undefined}
            } else {

                const parkingLotsUtil = new ParkingLotUtil(ParkingLot)
                const parkingLots = await parkingLotsUtil.deleteParkingLots(id)
                return { status: 200, error: undefined, data: parkingLots }

            }
        } catch{
            return {status:500 , error:'only admin can access' , data:undefined}
        }
    }
}
module.exports = ParkingLotController
