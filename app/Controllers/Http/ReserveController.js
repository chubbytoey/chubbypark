'use strict'

const Location = use('App/Models/Location')
const ParkingLot = use('App/Models/Parkinglot')
const Customer =use('App/Models/Customer')
const Category =use('App/Models/Category')
const CronJob = require('cron').CronJob;

function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

function reserveTimer(userData,lotReserve){
   
    

    const timeOut =new Date();
    timeOut.setSeconds(timeOut.getSeconds() +30)

    let job = new CronJob(timeOut, async function() {
        console.log(userData)
        console.log(lotReserve)

        lotReserve.merge({lot_status:"available",reserve_time:null,customer_id:null})
        await lotReserve.save()
        userData.merge({cancel:userData.cancel+1})
        await userData.save()

    });

    return job
}

let timer;

async function checkToken({auth}){
    try {
        await auth.check()
        
        return true

    } catch (error) {
        return {error: 'error' }
    }

}

function getFullDate(){
    const date = new Date()
   
    return {    year: date.getFullYear(),
                month: date.getMonth()+1,
                day: date.getDate(),
                hour:date.getHours(),
                minute:date.getMinutes(),
                second:date.getSeconds()
            }

}

function timeFormat(timeMilisecond){
    

    let seconds = Math.floor(timeMilisecond/1000);
    let minutes =Math.floor(seconds/60);
    seconds = seconds%60;
    let hours = Math.floor(minutes/60);
    minutes =minutes%60;

    const time = hours+":"+minutes+":"+seconds;
    

    return time

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
        
         
        const checkLogin = checkToken(auth)
     
        if(checkLogin.error){
            return 'please login'

        }else{


            const {location_id} = request.params

            const {references = undefined} =request.qs
            let lots 

            if (references){
                const extractedReferences = references.split(",")
                lots.with(extractedReferences)
            }


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


          } 

    }

    async reserve ({request,auth}){

        
        const checkLogin = checkToken(auth)

        if(checkLogin.error){
            return 'please login'

        }else{
            
            const {body,params} = request
            const {lot_name} = body
            const {location_id} = params


            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            const lotReserve = await ParkingLot.findBy({location_id:location_id,lot_name:lot_name})

            let date = new Date();
            let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 

            if(lotReserve.lot_status ==  "available"){

                lotReserve.merge({

                    lot_status:"unavailable",
                    customer_id:userData.customer_id,
                    reserve_time:time
                })

                await lotReserve.save() 

                userData.merge({
                    reservation: userData.reservation+1,
                })
                await userData.save()
               
        

                timer = reserveTimer(userData,lotReserve)
                timer.start();



                return 'success'
            }else{
                return 'this lot is unavailable'
            }
            

        }
        

    }

    async checkin ({auth}){

        const checkLogin = checkToken(auth)

        if(checkLogin.error){
            return 'please login'

        }else{
            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)
            
            const lotData = await ParkingLot.findBy('customer_id',userData.customer_id)
            
            
            
            let date = new Date();
            let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

            lotData.merge({checkin:time})
            await lotData.save()
            
            timer.stop();

            return 'check in'


        }

    
    }

    async checkout ({auth}){

    
        const checkLogin = checkToken(auth)

        if(checkLogin.error){
            
            return 'please login'

        }else{

            const token = await auth.getUser()

            const userData = await Customer.findBy('account_id',token.account_id)            
            const lotData = await ParkingLot.findBy('customer_id',userData.customer_id)
            const categoryData = await Category.findBy('category_id',lotData.category_id)
            const locationData = await Location.findBy('location_id',lotData.location_id) 


            const date = getFullDate();

            let dateFormat = date.year+"-"+date.month+"-"+date.day;

            console.log(dateFormat)

            let checkOut = new Date(dateFormat+" "+date.hour+":"+date.minute+":"+date.second)
            let checkIn = new Date(dateFormat+" "+lotData.checkin)

          
            const duration =Date.parse(checkOut)-Date.parse(checkIn);
            
            

            const useHour = timeFormat(duration)

            const paidHour = parseInt(Math.ceil(duration/3600000))






            if (paidHour>categoryData.free_hour){

               let price =  paidHour*locationData.price_rate;

                userData.merge({coin:userData.coin - price})
               
                lotData.merge({lot_status:"available",customer_id:null,reserve_time:null,checkin:null})
                await lotData.save()

                return 'Check out success , use time : '+useHour+' price : '+price+' remain coin : '+ userData.coin
            }else{
                lotData.merge({lot_status:"available",customer_id:null,reserve_time:null,checkin:null})
                await lotData.save()
                return 'Check out success , use time : '+useHour+' price : 0'
            }


          }


    }

    async cancel ({auth}){

     
        const checkLogin = checkToken(auth)

        if(checkLogin.error){
            return 'please login'

        }else{
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


          }



    }

    async test ({auth}){

        const date = getFullDate()
        
        return  date.year

    }

}

module.exports = ReserveController
