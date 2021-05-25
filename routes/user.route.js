const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// Get all users
router.get('/', userController.getAllUsers)

// Create new user
router.post('/new', userController.newUser)

// Show user
router.get('/:id', userController.showUser)

// Edit user
router.put('/:id/edit', userController.editUser)

// Delete user
router.delete('/:id', userController.deleteUser)

// Login
router.post('/login', userController.login)

module.exports = router