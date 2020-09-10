class AdminUtil {
    constructor(AdminModel) {
        this._Admin = AdminModel
    }

    getAll(references) {
        const admins = this._Admin.query()

        if(references) {
            const extractedReferences = references.split(",")
            admins.with(extractedReferences)
        }
        return admins.fetch()    
    }
    getByID(adminID , references) {
        const admin = this._Admin
        .query()
        .where('admin_id',adminID)

        if(references) {
            const extractedReferences = references.split(",")
            admin.with(extractedReferences)
        }
        return admin.fetch()    
    }
}
module.exports = AdminUtil