class ImageService {
  constructor() {
    let DaliEService = require('../dali_e/service')
    this.daliEService = new DaliEService()
    this.db = require('../../DB/mongoDB.js')
  }

  async getImages(groceries) {
    // Get all the images we got on the DB
    let collection = await this.db.query('Recipes', 'images', {})
    console.log(collection)

    // Checking which images we don't need to retrieve
    let images_url = []
    const all_groceries = groceries
    console.log(all_groceries);
    for (let grocery of all_groceries) {
      for (let doc of collection) {
        if (grocery == doc?.name) {
          console.log('\nMatch:');
          console.log(grocery);
          console.log(doc);
          images_url.push({ name: doc.name, url: doc.url })
          let new_groceries = await groceries.filter((grocery_item) => grocery !== grocery_item)
          console.log(new_groceries)
          groceries = new_groceries
          break
        }
      }
    }
    console.log('HHHHEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
    console.log(groceries)

    if (groceries.length > 0) {
      let prompts = []
      for(let grocery of groceries){
        prompts.push(`white background with the grocery: ${grocery}`)
      }
      console.log(prompts);
      // Generate images from Dali-E endpoint
      let new_images = await this.daliEService.generatePhoto(prompts)
      console.log(new_images)
      images_url= [...images_url,... new_images]
      
      // Store the results in DB:
      for (let new_image of new_images) {
        let groceryName=  new_image.prompt.substring( new_image.prompt.indexOf(":") + 2);
        let document = await { name: groceryName, url: new_image.url }
        await this.db.create('Recipes', 'images', document)
      }
    }
    
    console.log('finall resultttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt::::')
    console.log(images_url)

    return images_url.map((grocery) => {{}})
  }
}

module.exports = ImageService
