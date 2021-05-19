const express = require('express')
const router = express.Router()
const { User } = require('../models')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Create new user
router.post('/new', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Show user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Edit user
router.put('/:id/edit', async (req, res) => {
    try {
        const userInfo = {...req.body}
        const updatedUser = await User.findByIdAndUpdate(req.params.id, userInfo, {new: true})

        res.json(updatedUser)
    } catch (error) {
        res.json({error: error.message})
    }
})

// Delete user
router.delete('/:id/delete', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({error: error.message})
    }
})

module.exports = router