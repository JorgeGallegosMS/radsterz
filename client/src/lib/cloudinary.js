import { Cloudinary } from '@cloudinary/base'
import { cloudName } from '../vars'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName
  }
})

export default cloudinary