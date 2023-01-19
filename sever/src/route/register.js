
const express = require('express');
const router = express.Router();



// controllers
const registerController = require('../controller/registerController')


router.post('/login', registerController.login)
router.post('/signup', registerController.signup)



module.exports  = router