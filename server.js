const express = require('express')
const app = express()
const { port } = require('./vars')
const { Item } = require('./models')

// Database connection
require('./db/radsterzDB')

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/newitem', async (req, res) => {
    const itemInfo = {
        name: 'Necklace',
        description: 'A nice necklace',
        price: 2500,
        image: 'Placeholder'
    }
    const item = await Item.create(itemInfo)
    console.log(item)
    res.json(item)
})

app.listen(port, () => console.log(`http://localhost:${port}`))