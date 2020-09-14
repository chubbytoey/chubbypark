'use strict'


const Location = use('App/Models/Location')
const LocationValidator = require("../../../service/LocationValidator")
const LocationUtil = require("../../../util/locationUtil")


function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }
    return {}
}

class LocationController {

    async index({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { references = undefined } = request.qs

            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const locationUtil = new LocationUtil(Location)
                const locations = await locationUtil.getAll(references)

                return {
                    status: 200,
                    error: undefined,
                    data: locations
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
            const { id } = request.params

            const validatedValue = numberTypeParamValidator(id)
            if (validatedValue.error)
                return {
                    status: 500,
                    error: validatedValue.error,
                    data: undefined
                }

            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {

                const { references = undefined } = request.qs
                const locationUtil = new LocationUtil(Location)
                const location = await locationUtil.getById(id, references)

                return {
                    status: 200,
                    error: undefined,
                    data: location || {}
                }
            }
        } catch{
            return 'only admin can acces the information'
        }
    }

    async store({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { location_name, price_rate, category_id } = request.body
            const validatedData = await LocationValidator(request.body)

            if (validatedData.error)
                return {
                    status: 422,
                    error: validatedData.error,
                    data: undefined
                }

            const { references = undefined } = request.qs

            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {

                const locationUtil = new LocationUtil(Location)
                const location = await locationUtil.create({ location_name, price_rate, category_id }, references)

                await location.save()
            }
        } catch{
            return 'only admin can acces the information'
        }
    }

    async update({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { body, params } = request
            const { id } = params
            const { location_name, price_rate } = body

            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const locationUtil = new LocationUtil(Location)
                const locations = await locationUtil.updateLocation(id, location_name, price_rate)
                return { status: 200, error: undefined, data: locations }
            }
        } catch{
            return 'only admin can acces the information'
        }

    }

    async destroy({ request, auth }) {
        try {
            await auth.check()
            const user = await auth.getUser()
            const { id } = request.params

            if (user.status == 'customer') {
                return 'only admin can access the information'
            } else {
                const locationUtil = new LocationUtil(Location)
                const locations = await locationUtil.deleteLocation(id)
                return { status: 200, error: undefined, data: locations.message }
            }
        } catch {
            return 'only admin can acces the information'
        }
    }

}

module.exports = LocationController
