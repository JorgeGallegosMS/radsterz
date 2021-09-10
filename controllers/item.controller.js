const { Item } = require('../models')
const { cloudinary } = require('../lib/cloudinary')

const itemRoutes = {
  getAllItems: async (req, res) => {
    try {
        const items = await Item.find({})
        res.json(items)
    } catch (error) {
        res.json({error})
    }
  },
  newItem: async (req, res) => {
    try {
        // const { public_id, secure_url } = await cloudinary.uploader.upload(req.body.imageData, {folder: 'Items'})
        // const data = public_id.split('/')
        // const id = data[data.length-1]
        // const body = req.body
        // const itemInfo = {...body, price: parseInt(body.price), imageId: id, imageUrl: secure_url }
        
        // const item = await Item.create(itemInfo)
        // res.json({item, statusCode: 200})
        const { public_id } = await cloudinary.uploader.upload(req.body.imageData, {upload_preset: 'test_preset'})
        const body = req.body
        const itemInfo = {...body, price: parseInt(body.price), imageId: public_id }
        const item = await Item.create(itemInfo)
        
        res.json({item, statusCode: 200})
    } catch (error) {
        res.json({message: 'Please finish filling out the form', statusCode: 400})
    }
  },
  showItem: async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.json(item)
    } catch (error) {
        res.json({error})
    }
  },
  editItem: async (req, res) => {
    try {
        let itemInfo

        if (req.body.imageData) {
          const body = req.body

          // Invalidates cached image CDNs in Cloudinary
          await cloudinary.uploader.destroy(body.imageId)

          const { public_id } = await cloudinary.uploader.upload(body.imageData, {
            upload_preset: 'test_preset'
          })
          
          itemInfo = {...body, price: parseInt(body.price), imageId: public_id }
        } else {
          itemInfo = {...req.body, price: parseInt(req.body.price)}
        }
        
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, itemInfo, {new: true})
        res.json({item: updatedItem, statusCode: 200})
    } catch (error) {
        console.log(error)
        res.json({message: 'Please finish filling out the form', statusCode: 400})
    }
  },
  deleteItem: async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        await cloudinary.uploader.destroy(item.imageId)
        res.json({deleted: item})
    } catch (error) {
        res.json({error})
    }
  }
}

module.exports = itemRoutes