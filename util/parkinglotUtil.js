
// const Subject = use("App/Models/Subject")

class ParkingLotUtil {
    constructor(ParkingLotModel){
        this._ParkingLot = ParkingLotModel;
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

    async getAll(references){
        const parkinglots =this._ParkingLot.query();
        return this._withReferences(parkinglots,references).fetch();

    }
    async getById(id, references){
        const parkinglot = this._ParkingLot.query(id);

        return this._withReferences(parkinglot,references)
            .where("parkinglot_id",id)
            .fetch()
    }
    async create (parkinglotInstance, references){
        const {parkinglotId} = await this._ParkingLot.create(parkinglotInstance)
        const parkinglot = this._ParkingLot
            .query()
            .where('parkinglot_id',parkinglotId)

        return this._withReferences(parkinglot,references)
        .fetch()
        .then(response => response.first())
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
    async updateParkingLots(parkingID,lot_name,lot_status,checkin,category_id,location_id,customer_id) {
        const parkingLotsUpdate = await this._ParkingLot.findBy('parkinglot_id',parkingID)
        parkingLotsUpdate.lot_name = lot_name
        parkingLotsUpdate.lot_status = lot_status
        parkingLotsUpdate.checkin = checkin
        parkingLotsUpdate.category_id = category_id
        parkingLotsUpdate.location_id = location_id
        parkingLotsUpdate.customer_id = customer_id
        await parkingLotsUpdate.save()

        const parkingLots = await this._ParkingLot.findBy('parkinglot_id',parkingID)
        return parkingLots
    }



}
module.exports = ParkingLotUtil