'use strict'

const Location = use('App/Models/Location')
const ParkingLot = use('App/Models/Parkinglot')
const Customer =use('App/Models/Customer')
const Category =use('App/Models/Category')


function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class ReserveController {



    async show(){

        const locations = await Location.query()

        return {
            status: 200,
            error:undefined,
            data: locations.fetch()
        }
    }
    async showLot ({request,auth}){
        
         const {location_id} = request.params

        const {references = undefined} =request.qs
        let lots 

        if (references){
            const extractedReferences = references.split(",")
            lots.with(extractedReferences)
        }

        try {
            await auth.check()
            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            
            if (userData.gender=="female"&&userData.previllage=="vip"){

                lots = await ParkingLot.query().select('*').where({location_id:location_id,category_id:1,category_id:2,category_id:4}).fetch()

            }else if (userData.gender=="female"&&userData.previllage=="disabled"){

                lots = await ParkingLot.query().where({location_id:location_id,category_id:1,category_id:2,category_id:3}).fetch()

            }else if (userData.gender=="female"&&userData.previllage=="normal"){

                lots = await ParkingLot.query().where({location_id:location_id,category_id:1,category_id:2}).fetch()

            }else if (userData.gender=="male"&&userData.previllage=="vip"){

                lots = await ParkingLot.query().where({location_id:location_id,category_id:1,category_id:4}).fetch()

            }else if (userData.gender=="male"&&userData.previllage=="disabled"){

                lots = await ParkingLot.query().where({location_id:location_id,category_id:1,category_id:3}).fetch()


            }else if (userData.gender=="male"&&userData.previllage=="normal"){

                lots = await ParkingLot.query().where({location_id:location_id,category_id:1}).fetch()

            }

            return lots


          } catch (error) {

            return await ParkingLot.query().where({location_id:location_id}).fetch()
          }

    }

    async reserve ({request,auth}){
        const {body,params} = request
        const {lot_name} = body
        const {location_id} = params
       
  
        try {
            await auth.check()
            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            const lotReserve = await ParkingLot.findBy({location_id:location_id,lot_name:lot_name})

            let date = new Date();
            let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 

            if(lotReserve.lot_status, "availble"){
                lotReserve.merge({
                    lot_status:"unavailable",
                    customer_id:userData.customer_id,
                    reserve_time:time})
                await lotReserve.save() 

                userData.merge({
                    reservation: userData.reservation+1,
                })
                await userData.save()

                return 'success'
            }else{
                return 'this lot is unavailable'
            }



          
          } catch (error) {

            return 'please login first'
          }

    }

    async checkin ({auth}){

        try {
            await auth.check()
            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            const lotData = await ParkingLot.findBy('customer_id',userData.customer_id)
            
            
            
            let date = new Date();
            let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

            lotData.merge({checkin:time})
            await lotData.save()
            
            return 'check in'


          } catch (error) {

            return 'you have not reserved any lot '
            
          }
    }

    async checkout ({auth}){

        try {
            await auth.check()
            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            const lotData = await ParkingLot.findBy('customer_id',userData.customer_id)
            
            const categoryData = await Category.findBy('category_id',lotData.category_id)

            const locationData = await Location.findBy('location_id',lotData.location_id) 

            let date = new Date();
            let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
            let checkOut = new Date(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+time)
            let checkIn = new Date(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+lotData.checkin)

            let duration = Date.parse(checkOut) - Date.parse(checkIn);
            
            let second = Math.floor(duration/1000);
            let minutes =Math.floor(second/60);
            second = second%60;
            let hour = Math.floor(minutes/60);
            minutes =minutes%60;
            let useHour = hour+":"+minutes+":"+second

            let paidHour = parseInt(Math.ceil(duration/3600000))

            if (paidHour>categoryData.free_hour){

               let price =  paidHour*locationData.price_rate


                userData.merge({coin:userData.coin - price})
               
                lotData.merge({lot_status:"available",customer_id:null,reserve_time:null,checkin:null})
                await lotData.save()

                return 'Check out success , use time : '+useHour+' price : '+price+' remain coin : '+ userData.coin
            }else{

                return 'Check out success , use time : '+useHour+' price : 0'
            }


          } catch (error) {

            return 'you have not reserved any lot yet '
            
          }


    }

    async cancel ({auth}){

        try {
            await auth.check()
            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            const lotData = await ParkingLot.findBy('customer_id',userData.customer_id)
            
            lotData.merge({
                lot_status:"available",
                customer_id:null,
                reserve_time:null
            })
            await lotData.save()
            
            userData.merge({
                cancel: userData.cancel+1,
            })
            await userData.save()
          
            
            return 'cancelled'


          } catch (error) {

            return 'you have not reserved any lot '
            
          }



    }

}

module.exports = ReserveController
