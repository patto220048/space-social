const express = require('express');
const router = express.Router();

const commentController = require('../controller/commentController');
const veryfiToken  = require('../controller/veryfiToken')
//create comment
router.post('/create',veryfiToken.verifyUser,commentController.createComment)
//get comment
router.get('/:postId/find',veryfiToken.verifyUser,commentController.getComment)
//delete comment
router.delete('/:idcmt/delete',veryfiToken.verifyUser,commentController.deleteComment)



module.exports  = router