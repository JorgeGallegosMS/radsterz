require('dotenv/config')

const vars = {
    port: process.env.PORT || 5000,
    databaseURL: process.env.DATABASE_URL
}

module.exports = vars