const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/index')
require('./config/database')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(4000, () => console.log('Server listening on port 4000'))