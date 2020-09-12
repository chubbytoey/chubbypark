'use strict'


const Location = use('App/Models/Location')
const ParkingLot = use('App/Models/Parkinglot')


function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number))) {
        return {error:`param: ${number} is not supported, please use number type param instead`}
    }
    return {}
}

class AdminController {

    async addlot ({request}) {
        const {location_name,price_rate,amountOfLot,floor} =request.body
        const floorLot = amountOfLot / floor

        const location = new Location();
        location.location_name = location_name;
        location.price_rate = price_rate;

        await location.save()


        const locationId = await Location
            .query()
            .select('location_id')
            .where('location_name',location_name)
            .fetch()
            .then(response => response.first().location_id)

        let i
        let j

        for( i = 1 ; i<= floor;i+=1){
            for( j = 1;j<=floorLot;j+=1){

                const parkinglot = new ParkingLot();
                parkinglot.lot_name = i+"-"+j;
                parkinglot.category_id = 1;
                parkinglot.location_id = locationId;

                await parkinglot.save()

            }
                
        }
        
       
    
        return floorLot
    }




    
}

module.exports = AdminController
