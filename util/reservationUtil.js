// const Subject = use("App/Models/Subject")

class ReservationUtil {
  constructor(ParkinglotModel) {
    this._ParkingLot = ParkinglotModel;
  }
  _withReferences(model, references) {
    if (references) {
      const extractedReferences = references.split(",");
      extractedReferences.forEach((ref) => {
        model.with(ref);
      });
    }
    return model;
  }

  getByID(location_id, references) {
    const lots = this._ParkingLot
      .query()
      .select("*")
      .where({ location_id: location_id });

    if (references) {
      const extractedReferences = references.split(",");
      extractedReferences.forEach((ref) => {
        lots.with(ref);
      });
    }
    return lots.fetch();
  }
  getFemaleOnly(location_id, references) {
    const lots = this._ParkingLot
      .query()
      .select("*")
      .where({ location_id: location_id, category_id: 1 || 2 });

    if (references) {
      const extractedReferences = references.split(",");
      extractedReferences.forEach((ref) => {
        lots.with(ref);
      });
    }
    return lots.fetch();
  }
}
module.exports = ReservationUtil;
