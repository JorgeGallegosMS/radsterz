const { User } = require('../models')
const { secret } = require('../vars')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        const {_doc: { _id, username}} = user
        const payload = { id: _id, username: username }
        const options = { expiresIn: '1d' }

        const token = jwt.sign(payload, secret, options)
        res.json({
          token,
          user: {
            id: _id,
            name: username
          }
        })
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

        const payload = { id: user.id, username: user.username }
        const options = { expiresIn: '1d' }

        const token = jwt.sign(payload, secret, options)
        res.json({
          token,
          user: {
            id: user.id,
            name: user.username
          }
        })
    } catch (error) {
        res.json({error: error.message})
    }
  },
  checkToken: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      res.json({valid: true, user})
    } catch (error) {
      res.json({error: error.message})
    }
  }
}

module.exports = userRoutes