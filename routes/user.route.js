const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const checkAuth = require('../middlware/auth')

// Get all users
router.get('/', userController.getAllUsers)

// Create new user
router.post('/new', userController.newUser)

// Show user
router.get('/:id', userController.showUser)

// Edit user
router.put('/:id', userController.editUser)

// Delete user
router.delete('/:id', userController.deleteUser)

// Login
router.post('/login', userController.login)

// Validate token
router.post('/validate', checkAuth, userController.checkToken)

module.exports = router