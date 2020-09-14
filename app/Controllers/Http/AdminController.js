'use strict'


const Location = use('App/Models/Location')
const ParkingLot = use('App/Models/Parkinglot')
const Category = use('App/Models/Category')

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
        
       
    
        return 'success'
    }
    async addType({request}){

        let type =["normal","female","disabled","vip"]
        let category 
        let i
        for(i=0;i<type.length;i++){

            if(type[i]=="normal"||type[i]=="female"){

                category = new Category();

                category.type = type[i];
                category.free_hour = 2;

                await category.save()

            }else if(type[i]=="disabled"||type[i]=="vip"){

                
                category = new Category();
            
                category.type = type[i];
                category.free_hour = 3;
            
                await category.save()

            }


        }
        





    }



    
}

module.exports = AdminController
