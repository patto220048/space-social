const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const docenv = require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 4000
const route = require('./route');


// app use libraries
app.use(cors())
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded())

// connect to database
const db = require('./db')
db.connect()

// app listening on port
app.listen(PORT ,() => {
    console.log(`Sever listen http://localhost:${PORT}`)
})

// app routes
route(app);
