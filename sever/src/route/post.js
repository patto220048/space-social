const express = require('express');
const router = express.Router();

const postController = require('../controller/postController');
const veryfiToken  = require('../controller/veryfiToken')

//creat post
router.post('/create',veryfiToken.verifyUser, postController.createPost)
// get random post
router.get('/find',veryfiToken.verifyUser, postController.findPost)
//get 1 post 
router.get('/find/v1/:id',veryfiToken.verifyUser, postController.findOne)
//update post
router.put('/update/:id',veryfiToken.verifyUser, postController.updatePost)
//delete post
router.delete('/delete/:id',veryfiToken.verifyUser, postController.deletePost)
//like / dislike
router.put('/:id/like',veryfiToken.verifyUser, postController.likePost)
//get new post from user (close to current time)
router.get('/newpost',veryfiToken.verifyUser, postController.newPost)
//get post from user follwed
router.get('/folowed',veryfiToken.verifyUser, postController.followedPost)


module.exports  = router
