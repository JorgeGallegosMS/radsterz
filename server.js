const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { port } = require('./vars')

app.use(cors())
app.use(cookieParser())

// Database connection
require('./db/radsterzDB')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

// Routes
const routes = require('./routes')

app.use('/api/items', routes.itemRoutes)
app.use('/api/users', routes.userRoutes)

app.listen(port, () => console.log(`http://localhost:${port}`))