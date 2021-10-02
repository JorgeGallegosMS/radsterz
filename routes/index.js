const itemRoutes = require('./item.route')
const userRoutes = require('./user.route')
const stripeRoutes = require('./stripe.route')

const routes = {
    itemRoutes,
    userRoutes,
    stripeRoutes
}

module.exports = routes