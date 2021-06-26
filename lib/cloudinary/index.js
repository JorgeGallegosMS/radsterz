const cloudinary = require('cloudinary').v2
const { cloudName, cloudinaryKey, cloudinarySecret } = require('../../vars')

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret
})

module.exports = { cloudinary }