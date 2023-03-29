
const express = require('express');
const router = express.Router();



// controllers
const registerController = require('../controller/registerController')


router.post('/login', registerController.login)
router.post('/reset', registerController.findEmail)
router.post('/signup', registerController.signup)
router.post('/withgg', registerController.withGoogle)
router.get('/signout', registerController.signout)



module.exports  = router