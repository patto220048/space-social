const express = require('express');
const router = express.Router();

const postController = require('../controller/postController');
const veryfiToken  = require('../controller/veryfiToken')

//creat post
router.post('/create',veryfiToken.verifyUser, postController.createPost)
// get random post
router.get('/random',veryfiToken.verifyUser, postController.findPost)
//get 1 post 
router.get('/find/v1/:id',veryfiToken.verifyUser, postController.findOne)
//get new post from user (close to current time)
router.get('/newpost',veryfiToken.verifyUser, postController.newPost)
//get post from user follwed
router.get('/folowed',veryfiToken.verifyUser, postController.followedPost)
//get my post   
router.get('/profile/:id',veryfiToken.verifyUser, postController.myPost)
//delete post
router.delete('/delete/:id',veryfiToken.verifyUser, postController.deletePost)
//like / dislike
router.put('/like',veryfiToken.verifyUser, postController.likePost)
router.put('/dislike',veryfiToken.verifyUser, postController.dislikePost)
//update post
router.put('/update/:id',veryfiToken.verifyUser, postController.updatePost)


module.exports  = router
