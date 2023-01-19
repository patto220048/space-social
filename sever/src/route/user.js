const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const veryfiToken  = require('../controller/veryfiToken')

// find all users
router.get('/find', userController.getUser)
// find  1 user 
router.get('/find/:id', userController.getOneUser)
// put user
router.put('/edit/:id',veryfiToken.verifyUser,veryfiToken.verifyAdmin ,userController.editUser)
//detele user
router.delete('/delete/:id',veryfiToken.verifyUser,veryfiToken.verifyAdmin,userController.deteleUser)


module.exports  = router