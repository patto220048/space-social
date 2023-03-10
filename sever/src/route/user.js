const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const veryfiToken  = require('../controller/veryfiToken')

// find all users
router.get('/find',veryfiToken.verifyUser, userController.getUser)
// find a user 
router.get('/find/:id',veryfiToken.verifyUser, userController.getOneUser)
// put a user
router.put('/edit/:id',veryfiToken.verifyUser, userController.editUser)
//detele a user
router.delete('/delete/:id',veryfiToken.verifyUser,userController.deteleUser)
//follow a user
router.put('/follow/:id',veryfiToken.verifyUser,userController.followUser)  
//unfollow a user
router.put('/unfollow/:id',veryfiToken.verifyUser,userController.unfollowUser)
// search user
router.get('/search',veryfiToken.verifyUser,userController.searchUser)
// pendding
router.put('/pendding/:id',veryfiToken.verifyUser,userController.pendding)  
//unpending
router.put('/unpendding/:id',veryfiToken.verifyUser,userController.unPendding)
//accept
router.put('/accept/:id',veryfiToken.verifyUser,userController.accept)
//reject
router.put('/reject/:id',veryfiToken.verifyUser,userController.reject)
//remove friend
router.put('/remove/:id',veryfiToken.verifyUser,userController.removeFriend)



module.exports  = router