const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item.controller')

// Get all items
router.get('/', itemController.getAllItems)

// Create new item
router.post('/new', itemController.newItem)

// Show item
router.get('/:id', itemController.showItem)

// Edit item
router.put('/:id/edit', itemController.editItem)

// Delete an item
router.delete('/:id/delete', itemController.deleteItem)

module.exports = router