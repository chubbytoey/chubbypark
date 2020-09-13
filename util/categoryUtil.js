
// const Subject = use("App/Models/Subject")

class CategoryUtil {
    constructor(CategoryModel){
        this._Category = CategoryModel;
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
        const categories =this._Category.query();
        return this._withReferences(categories,references).fetch();

    }
    async getById(id, references){
        const category = this._Category.query(id);

        return this._withReferences(category,references)
            .where("category_id",id)
            .fetch()
    }
    async create (categoryInstance, references){
        const {category_id} = await this._Category.create(categoryInstance)
        const category = this._Category
            .query()
            .where('category_id',category_id)

        return this._withReferences(category,references)
        .fetch()
        .then(response => response.first())
    }
    async deleteCategory(categoryID) {
        const category = await this._Category.findBy('category_id',categoryID)
        if(!category) {
            return {message : 'cant find data'}
        } else{
            category.delete()
            await category.save()
            return {message : 'delete success'}
        }
    }
    async updateCategory(categoryID,type,free_hour) {
        const categoryUpdate = await this._Category.findBy('category_id',categoryID)
        categoryUpdate.type = type
        categoryUpdate.free_hour = freee_hour
        await categoryUpdate.save()

        const category = await this._Category.findBy('category_id',categoryID)
        return category
    }


}
module.exports = CategoryUtil