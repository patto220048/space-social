const express = require('express');
const router = express.Router();

const commentController = require('../controller/commentController');
const veryfiToken  = require('../controller/veryfiToken')

router.post('/create',veryfiToken.verifyUser,commentController.createComment)


module.exports  = router