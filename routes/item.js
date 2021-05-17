const express = require('express')
const { findByIdAndDelete } = require('../models/item')
const router = express.Router()
const Item = require('../models/item')

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({})
        res.json(items)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Create new item
router.post('/new', async (req, res) => {
    try {
        const body = req.body
        const itemInfo = {...body, price: parseInt(body.price)}

        const item = await Item.create(itemInfo)
        res.json(item)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Show item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.json(item)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Edit item
router.put('/:id/edit', async (req, res) => {
    try {
        const body = req.body
        const itemInfo = {...body, price: parseInt(body.price)}

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, itemInfo, {new: true})
        res.json(updatedItem)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Delete an item
router.delete('/:id/delete', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        res.json({deleted: item})
    } catch (error) {
        res.json({error: error.message})
    }
})

module.exports = router