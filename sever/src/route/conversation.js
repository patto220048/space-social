const express = require('express');
const router = express.Router();

const conversationController = require('../controller/conversationController');
const veryfiToken  = require('../controller/veryfiToken')

//create conver

router.post("/", veryfiToken.verifyUser,  conversationController.create)
// get conver
router.get("/:userId", veryfiToken.verifyUser, conversationController.getConversation)

module.exports  = router