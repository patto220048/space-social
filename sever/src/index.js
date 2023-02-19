const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const docenv = require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 4000
const route = require('./route');

const corsConfig = {
    origin: 'http://localhost:3001',
    credentials: true,
  }

// app use libraries
app.use(cors(corsConfig))
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded())
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header('Access-Control-Allow-Credentials', true);
//     // res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
//     });

// connect to database
const db = require('./db')
db.connect()

// app listening on port
app.listen(PORT ,() => {
    console.log(`Sever listen http://localhost:${PORT}`)
})

// app routes
route(app);
