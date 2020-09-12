'use strict'

const Database = use('Database')
const Location = use('App/Models/Location')
const ParkingLot = use('App/Models/Parkinglot')
const Customer =use('App/Models/Customer')



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


}

module.exports = ReserveController
