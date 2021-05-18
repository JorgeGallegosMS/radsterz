const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { port } = require('./vars')

// Database connection
require('./db/radsterzDB')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

// Routes
const routes = require('./routes')

app.use('/items', routes.itemRoutes)
app.use('/users', routes.userRoutes)

app.listen(port, () => console.log(`http://localhost:${port}`))