const express = require('express');
const router = express.Router();

const messageController = require('../controller/messageController');
const veryfiToken  = require('../controller/veryfiToken')
//create message
router.post('/',veryfiToken.verifyUser, messageController.create )
router.get('/:conversationId',veryfiToken.verifyUser, messageController.getMessage )
module.exports  = router