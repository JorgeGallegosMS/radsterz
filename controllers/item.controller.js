const { Item } = require('../models')
const { cloudinary } = require('../lib/cloudinary')

const itemRoutes = {
  getAllItems: async (req, res) => {
    try {
        const items = await Item.find({})
        res.json(items)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  newItem: async (req, res) => {
    try {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.body.imageData, {folder: 'Items'})
        const data = public_id.split('/')
        const id = data[data.length-1]
        const body = req.body
        const itemInfo = {...body, price: parseInt(body.price), imageId: id, imageUrl: secure_url }

        const item = await Item.create(itemInfo)
        res.json(item)
    } catch (error) {
        console.error(error)
        res.json({error: error.message})
    }
  },
  showItem: async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.json(item)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  editItem: async (req, res) => {
    try {
        let itemInfo

        if (req.body.imageData) {
          const { public_id, secure_url } = await cloudinary.uploader.upload(req.body.imageData, {public_id: req.body.imageId, folder: 'Items'})
          itemInfo = {...req.body, price: parseInt(req.body.price), imageId: public_id, imageUrl: secure_url }
        } else {
          itemInfo = {...req.body, price: parseInt(req.body.price)}
        }
        
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, itemInfo, {new: true})
        res.json(updatedItem)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  deleteItem: async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        await cloudinary.uploader.destroy(item.imageId)
        res.json({deleted: item})
    } catch (error) {
        res.json({error: error.message})
    }
  }
}

module.exports = itemRoutes