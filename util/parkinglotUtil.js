
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



}
module.exports = ParkingLotUtil