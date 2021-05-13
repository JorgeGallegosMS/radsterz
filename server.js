const express = require('express')
const app = express()
const { port } = require('./vars')

app.listen(port, () => console.log(`http://localhost:${port}`))