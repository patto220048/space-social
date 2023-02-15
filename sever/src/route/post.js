const express = require('express');
const router = express.Router();

const postController = require('../controller/postController');
const veryfiToken  = require('../controller/veryfiToken')


router.post('/create', postController.creatPost)


module.exports  = router
