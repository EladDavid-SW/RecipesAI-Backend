class ImageService {
  constructor() {
    let DaliEService = require('../dali_e/service')
    this.daliEService = new DaliEService()
    this.db = require('../../DB/mongoDB.js')
  }

  async getImages(groceries) {
    let collection = await this.db.query('Recipes', 'images', {})
    console.log('ddddd')
    console.log(collection)
    let images_url = []
    for (let grocery of groceries) {
      for (let doc of collection) {
        if (grocery == doc?.name) {
          images_url.push({ name: doc.name, url: doc.url })
          let new_groceries = await groceries.filter((grocery_item) => grocery !== grocery_item)
          console.log(new_groceries)
          groceries = new_groceries
        }
      }
    }
    console.log('HHHHEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
    console.log(groceries)
    if (groceries.length() !== 0) {
      let new_images = await this.daliEService.generatePhoto(groceries)
    } else {
      let new_images = groceries
    }

    console.log(new_images)
    for (let new_image of new_images) {
      await console.log(new_image.prompt + new_image.url)
      let document = { name: new_image.prompt, url: new_image.url }
      await console.log(new_image.prompt + new_image.url)
      await this.db.create('Recipes', 'images', document)
    }
    let collectionn = await this.db.query('Recipes', 'images', {})
    console.log('eeee')
    console.log(collectionn)
    // returnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  }
}

module.exports = ImageService
