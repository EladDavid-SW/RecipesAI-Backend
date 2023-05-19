const dbHelper = require('../services/db/dbHelper')
const StoreImageService = require('../services/S3/StoreImageService')
const DaliEService = require('../API/dali_e/service')

daliEService = new DaliEService()
storeImage = new StoreImageService()

async function fetchImages() {
  try {
    let result = await dbHelper.query('getImages')
    let groceriesObj = result[0]
    if (!groceriesObj) {
      return []
    }
    return groceriesObj.images
  } catch (err) {
    console.error('Error fetching images:', err)
    return [] // Return an empty array in case of an error
  }
}

async function validateImages() {
  try {
    // Retrieve image names from the database
    let images = await fetchImages()

    const namesWithUnderscores = images.map((image) => {
      return image.replace(/ /g, '_')
    })
    images = namesWithUnderscores


    let toGenerateImages = []

    for (const image of images) {
      const objectKey = image
      const exists = await storeImage.objectExists(objectKey)
      if (!exists) {
        toGenerateImages.push({ prompt: `bright warm white background with the grocery: ${image}` + `, object in the middle, clear sharp photo, no crops`, name: image })
      }
    }
    console.log(toGenerateImages)
    // Generate images from Dali-E endpoint
    let new_images = await daliEService.generateImage(toGenerateImages)

    console.log('Image validation completed.')
  } catch (error) {
    console.error('Error occurred during image validation:', error)
  }
}

validateImages()
