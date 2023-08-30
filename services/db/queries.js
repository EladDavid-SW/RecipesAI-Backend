module.exports = {
  getImages: () => ({
    collectionName: 'images',
    query: { images: { $exists: true, $not: { $size: 0 } } },
  }),
  updateImages: (param) => ({
    collectionName: 'images',
    query: { _id: param.id },
    update: { $addToSet: { images: param.item } },
  }),
  deleteImage: (param) => ({
    collectionName: 'images',
    query: { _id: param.id },
    update: { $pull: { images: { $in: [param.item] } } }
  }),
  
}
