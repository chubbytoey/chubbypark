'use strict'


const Category = use('App/Models/Category')
const CategoryValidator = require("../../../service/CategoryValidator")
const CategoryUtil = require("../../../util/categoryUtil")

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}


class CategoryController {

    async index({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const { references = undefined } = request.qs
                const categoryUtil = new CategoryUtil(Category)
                const categories = await categoryUtil.getAll(references)

                return {
                    status: 200,
                    error: undefined,
                    data: categories
                }
            }
        } catch {
            return 'only admin can acces the information'
        }
    }

    async show({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const { id } = request.params

                const validatedValue = numberTypeParamValidator(id)
                if (validatedValue.error)
                    return { status: 500, error: validatedValue.error, data: undefined }

                const { references = undefined } = request.qs
                const categoryUtil = new CategoryUtil(Category)
                const category = await categoryUtil.getById(id, references)

                return {
                    status: 200,
                    error: undefined,
                    data: category || {}
                }
            }
        }
        catch{
            return 'only admin ca acces the information'
        }
    }
    async store({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()

            const { type, free_hour } = request.body
            const validatedData = await CategoryValidator(request.body)
            if (validatedData.error)
                return { status: 422, error: validatedData.error, data: undefined }

            const { references = undefined } = request.qs

            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {

                const categoryUtil = new CategoryUtil(Category)
                const category = await categoryUtil.create({ type, free_hour }, references)
                await category.save()
                return { status: 200, error: undefined, data: category }
            }
        } catch {
            return 'only admin can access the information'
        }
    }
    async update({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { id } = request.params
            const { type } = request.body
            const { free_hour } = request.body

            if (user.status == 'customer') {
                return 'only admin can see the information'
            } else {

                const categoryUtil = new CategoryUtil(Category)
                const categories = await categoryUtil.updateCategory(id, type, free_hour)

                return { status: 200, error: undefined, data: categories }
            }
        } catch{
            return 'only admin can access the information'
        }
    }
    async destroy({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            if (user.status == 'customer') {
                return 'only admin can see the information'
            } else {
                const { id } = request.params
                const categoryUtil = new CategoryUtil(Category)
                const categories = await categoryUtil.deleteCategory(id)

                return { status: 200, error: undefined, data: categories.message }
            }
        } catch {
            return 'only admin can access the information'
        }
    }
}

module.exports = CategoryController
