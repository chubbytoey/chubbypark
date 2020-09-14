
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
    async createLocation (location_name, price_rate){
        const locations = await this._Location.create(location_name,price_rate)
        return locations
    }
    // async create (locationInstance, references){
    //     const {location_id} = await this._Location.create(locationInstance)
    //     const location = this._Location
    //         .query()
    //         .where('location_id',location_id)

    //     return this._withReferences(location,references)
    //     .fetch()
    //     .then(response => response.first())
    // }

    async deleteLocation(locationID) {
        const location = await this._Location.findBy('location_id',locationID)
        if(!location) {
            return {message : 'cant find data'}
        } else{
            location.delete()
            await location.save()
            return {message : 'delete success'}
        }
    }
    async updateLocation(locationID,location_name,price_rate) {
        const locationUpdate = await this._Location.findBy('location_id',locationID)
        locationUpdate.location_name = location_name
        locationUpdate.price_rate = price_rate
        await locationUpdate.save()

        const location = await this._Location.findBy('location_id',locationID)
        return location
    }

}
module.exports = LocationUtil