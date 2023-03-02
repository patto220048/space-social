const express = require('express');
const router = express.Router();

const notificationController = require('../controller/notificationController');
const veryfiToken  = require('../controller/veryfiToken')
//create notifi
router.post('/v1/create',veryfiToken.verifyUser,notificationController.createNotifi)
router.get('/v1/get',veryfiToken.verifyUser,notificationController.getNotifi)


module.exports  = router