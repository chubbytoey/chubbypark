'use strict'


const Location = use('App/Models/Location')
const ParkingLot = use('App/Models/Parkinglot')
const Category = use('App/Models/Category')

class AdminController {

    async addlot({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'admin') {
                const { location_name, price_rate, amountOfLot, floor } = request.body
                const floorLot = amountOfLot / floor

                const location = new Location();
                location.location_name = location_name;
                location.price_rate = price_rate;

                await location.save()

                const locationId = await Location
                    .query()
                    .select('location_id')
                    .where('location_name', location_name)
                    .fetch()
                    .then(response => response.first().location_id)

                let i
                let j

                for (i = 1; i <= floor; i += 1) {
                    for (j = 1; j <= floorLot; j += 1) {

                        const parkinglot = new ParkingLot();
                        parkinglot.lot_name = i + "-" + j;
                        parkinglot.category_id = 1;
                        parkinglot.location_id = locationId;

                        await parkinglot.save()
                    }
                }
                return {status:200 , error:undefined , data:parkinglot}
            } else {
                return {status:500 , error:'only admin cans access' , data:'success'}
            }
        } catch(err) {
            return {status:500 , error:'only admin can access' , data:undefined}
        }

    }
    async addType({ request, auth }) {

        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'admin') {

                let type = ["normal", "female", "disabled", "vip"]
                let category
                let i
                for (i = 0; i < type.length; i++) {

                    if (type[i] == "normal" || type[i] == "female") {

                        category = new Category();
                        category.type = type[i];
                        category.free_hour = 2;
                        await category.save()

                    } else if (type[i] == "disabled" || type[i] == "vip") {

                        category = new Category();
                        category.type = type[i];
                        category.free_hour = 3;
                        await category.save()

                    }
                }
            } else {
                return {status:500 , error:'only admin can access' , data:undefined}
            }
        } catch {
            return {status:500 , error:'only admin can access' , data:undefined}
        }
    }
}

module.exports = AdminController
