const { secret } = require('../vars')
const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    const token = req.header('auth-token')
  
    if (!token) throw new Error('You are not authorized to do that')

    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (error) {
    res.json({error: error.message})
  }
}

module.exports = checkAuth 