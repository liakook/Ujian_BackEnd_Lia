// BIKIN SERVER DI INDEX.JS

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 5000

app.use(bodyparser.json())
app.use('/api' , require('./2. router/movieRouter'))

app.listen(port , () => console.log('Server jalan di port ' + port))