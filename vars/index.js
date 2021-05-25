require('dotenv/config')

const vars = {
    port: process.env.PORT || 5000,
    databaseURL: process.env.DATABASE_URL,
    secret: process.env.JWT_SECRET
}

module.exports = vars