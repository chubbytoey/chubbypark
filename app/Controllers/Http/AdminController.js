'use strict'
const Database = use('Database')
const Admin = use('App/Models/Admin')
const AdminValidator = require('../../../service/AdminValidator.js')
const AdminUtil = require('../../../util/AdminUtil')

function numberTypeParamValidator (number) {
    if(Number.isNaN(parseInt(number))) {
        return {error:`param: ${number} is not supported, please use number type param instead`}
    }
    return {}
}

class AdminController {
    async index({request}) {
        const {references = undefined} = request.qs

        const adminUtil = new AdminUtil(Admin)
        const admins = await adminUtil.getAll(references)

        return {status:200 , error:undefined , data:admins || {}}
    }
    async show({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)

        if(ValidatedValue.error) {
            return {status:500 , error:ValidatedValue.error , data:undefined}
        }

        const {references} = request.qs
        const adminUtil = new AdminUtil(Admin)
        const admins = await adminUtil.getByID(id,references)

        return {status:200 , error:undefined , data:admins || {}}
    }

    async store({request}) {
        const {first_name,last_name} = request.body

        const ValidatedData = await AdminValidator(request.body)

        if(ValidatedData.error) 
            return {status:422 , error:ValidatedData.error , data:undefined}

        await Admin.create({first_name,last_name})
        return {status:200 , error:undefined , data:`created succesfully`}
    }

    async update({request}) {
        const {body , params} = request

        const {id} = params
        const {first_name,last_name} = body

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
            return {status:500 , error:ValidatedValue.error , data:undefined}

        const adminID = await Database
            .table('admins')
            .where({admin_id:id})
            .update({first_name,last_name})

        const admin = await Database
            .table('admins')
            .where({admin_id:id})
            .first()

        return {status:200 , error:undefined , data:admin}
    }
    async destroy({request}) {
        const {id} = request.params

        const ValidatedValue = numberTypeParamValidator(id)
        if(ValidatedValue.error)
        return {status:500 , error:ValidatedValue.error , data:undefined}

        await Database
            .table('admins')
            .where({admin_id:id})
            .delete()

        return {status:200 , error:undefined , data:{message:'success'}}
    }
}

module.exports = AdminController
