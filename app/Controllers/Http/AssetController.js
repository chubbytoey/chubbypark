'use strict'

const Helpers = use("Helpers")

class AssetController {
  show({request,response}) {
    const {fileName} = request.params
    return response.dowload(Helpers.tmpPath(`upload/${fileName}`))
  }
}

module.exports = AssetController
