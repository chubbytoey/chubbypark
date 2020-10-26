"use strict";
const Helpers = use("Helpers")
const Env = use("Env")
class AssetController {

  show({ request, response }) {
    const { fileName } = request.params;
    return response.download(Helpers.tmpPath(`upload/${fileName}`))
  }

  async upload({ request }) {
    const file = request.file("image", {
      types: ["image"],
      size: "2mb",
    });
    const fileName = `${new Date().getTime()}.jpg`;
    await file.move(Helpers.tmpPath("upload"), {
      name: fileName
    });
    if (!file.moved()) throw new Error("file move error");

    return { statis: 200, data: {
      path: `http://${Env.get('HOST')}:${Env.get('PORT')}/api/v1/assets/${fileName}`
    }};
  }
}

module.exports = AssetController;
