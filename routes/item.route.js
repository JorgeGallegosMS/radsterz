const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item.controller')
const multer = require('multer')
const upload = multer()

router.use(upload.single('image'))
// const checkAuth = require('../middlware/auth')

// Get all items
router.get('/', itemController.getAllItems)

// Create new item
router.post('/new', itemController.newItem)

// Show item
router.get('/:id', itemController.showItem)

// Edit item
router.put('/:id', itemController.editItem)

// Delete an item
router.delete('/:id', itemController.deleteItem)

module.exports = router