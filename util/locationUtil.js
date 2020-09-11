
// const Subject = use("App/Models/Subject")

class LocationUtil {
    constructor(LocationModel){
        this._Location = LocationModel;
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
        const locations =this._Location.query();
        return this._withReferences(locations,references).fetch();

    }
    async getById(id, references){
        const location = this._Location.query(id);

        return this._withReferences(location,references)
            .where("location_id",id)
            .fetch()
    }
    async create (locationInstance, references){
        const {location_id} = await this._Location.create(locationInstance)
        const location = this._Location
            .query()
            .where('location_id',location_id)

        return this._withReferences(location,references)
        .fetch()
        .then(response => response.first())
    }



}
module.exports = LocationUtil