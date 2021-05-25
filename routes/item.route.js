const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item.controller')
const checkAuth = require('../middlware/auth')

// Get all items
router.get('/', itemController.getAllItems)

// Create new item
router.post('/new', checkAuth, itemController.newItem)

// Show item
router.get('/:id', itemController.showItem)

// Edit item
router.put('/:id/edit', itemController.editItem)

// Delete an item
router.delete('/:id/delete', itemController.deleteItem)

module.exports = router