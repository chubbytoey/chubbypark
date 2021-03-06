
// const Subject = use("App/Models/Subject")

class ParkinglotUtil {
    constructor(ParkinglotModel){
        this._ParkingLot = ParkinglotModel
    }
    _withReferences(model,references) {
        if (references){
            const extractedReferences = references.split(",")
            extractedReferences.forEach((ref) => {
                model.with(ref);
            });

        }
        return model;
    }

    getAll(references) {
        const parkinglots = this._ParkingLot.query()


        if(references) {
            const extractedReferences = references.split(",")
            extractedReferences.forEach((ref) => {
            parkinglots.with(ref);
            });
        }
        return parkinglots.fetch()
    }

    // async getById(id, references){
    //     const parkinglot = this._ParkingLot.query(id);

    //     return this._withReferences(parkinglot,references)
    //         .where("parkinglot_id",id)
    //         .fetch()
    // }
    getByID(parkinglotID , references) {
      console.log(parkinglotID)
        const parkinglots = this._ParkingLot
        .query()
        .where('parkinglot_id',parkinglotID)

        if(references) {
            const extractedReferences = references.split(",")
            extractedReferences.forEach((ref) => {
            parkinglots.with(ref);
            });

        }
        return parkinglots.fetch()
    }

    async create (parkinglotInstance){
        const {parkinglotId} = await this._ParkingLot.create(parkinglotInstance)

        return 'success'
    }

    async deleteParkingLots(parkingID) {

        const parkingLots = await this._ParkingLot.findBy('parkinglot_id',parkingID)
        if(!parkingLots) {
            return {message : 'cant find data'}
        } else{
            parkingLots.delete()
            await parkingLots.save()
            return {message : 'delete success'}
        }
    }
    async updateParkingLots(parkingID,lot_name,lot_status,reserve_time,checkin,category_id,location_id,customer_id) {
        const parkingLotsUpdate = await this._ParkingLot.findBy('parkinglot_id',parkingID)
        parkingLotsUpdate.lot_name = lot_name
        parkingLotsUpdate.lot_status = lot_status
        parkingLotsUpdate.reserve_time = reserve_time
        parkingLotsUpdate.checkin = checkin
        parkingLotsUpdate.category_id = category_id
        parkingLotsUpdate.location_id = location_id
        parkingLotsUpdate.customer_id = customer_id
        await parkingLotsUpdate.save()

        const parkingLots = await this._ParkingLot.findBy('parkinglot_id',parkingID)
        return parkingLots
    }

    _withReference(instance, references) {
        if (references) {
            const extractedReferences = references.split(",")
            instance.with(extractedReferences)
        }
        return instance
    }

}
module.exports = ParkinglotUtil
