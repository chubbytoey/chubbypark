'use strict'


const Category = use('App/Models/Category')
const CategoryValidator = require("../../../service/CategoryValidator")

function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class CategoryController {

    async index(){
        const categories = await Category.all()
        return {status: 200,error:undefined,data: categories}
    }
    async show({request}){
        const {id} = request.params

        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error)
            return {status:500,error:validatedValue.error,data: undefined}
        const category = await Category.find(id)

        return {status:200,error:undefined,data: category || {}}
    }
    async store ({request}){
        const {type,hour} = request.body
        const validatedData = await CategoryValidator(request.body)

        if (validatedData.error)
            return{status: 422,error: validatedData.error,data: undefined}
        
        const category = new Category()
            category.type =type;
            category.hour=hour;
        
        await category.save()


    }
    async update ({request}){
        const {body, params} = request
        const {id} = params
        const {type,hour} = body
        const category = await Category.find(id)

        category.merge({type:type,hour:hour})
         await category.save()

    }
    async destroy ({request}){
        const {id} = request.params
        const category = await Category.find(id)
        await category.delete()
    }


}

module.exports = CategoryController
