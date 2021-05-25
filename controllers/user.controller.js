const { User } = require('../models')
const bcrypt = require('bcrypt')

const userRoutes = {
  getAllUsers: async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  newUser: async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.redirect(`/users/${user._id}`)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  showUser: async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  editUser: async (req, res) => {
    try {
        const userInfo = {...req.body}
        const updatedUser = await User.findByIdAndUpdate(req.params.id, userInfo, {new: true})

        res.json(updatedUser)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  deleteUser: async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json(user)
    } catch (error) {
        res.json({error: error.message})
    }
  },
  login: async (req, res) => {
    try {
        const { username, password } = req.body
        const users = await User.find({username})
        const user = users[0]

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error('Wrong username or password')

        res.json({login: true, user})
    } catch (error) {
        res.json({error: error.message})
    }
  }
}

module.exports = userRoutes