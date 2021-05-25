const { Item } = require('../models')

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
        const body = req.body
        const itemInfo = {...body, price: parseInt(body.price)}

        const item = await Item.create(itemInfo)
        res.json(item)
    } catch (error) {
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
        const body = req.body
        const itemInfo = {...body, price: parseInt(body.price)}

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, itemInfo, {new: true})
        res.json(updatedItem)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  deleteItem: async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        res.json({deleted: item})
    } catch (error) {
        res.json({error: error.message})
    }
  }
}

module.exports = itemRoutes