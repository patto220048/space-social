const User = require('../model/userModel')

const bcrypt = require('bcryptjs')
const { query } = require('express')

class userController {

    async getUser(req, res, next){
        try {

        const allUser = await User.find()
            res.status(200).json(allUser)
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }

        
    }
    async getOneUser(req, res, next){
        
        try {

            const user  = await User.findById(req.params.id)
            res.status(200).json(user)

            
        } catch (err) {
            res.status(500).json(err.message)
            
        }
    }

    async editUser(req, res, next){
        if(req.params.id === req.user.id || req.user.admin ){
            //if edit password , password will hash again
            if(req.body.password){
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password,salt)
                    
                } catch (err) {
                    return res.status(500).json(err.message)

                }
            }
            try {
                const editUser = await User.findByIdAndUpdate(req.params.id,{
                    $set : req.body
                }, {new: true})
                res.status(200).json(editUser)
            }
            catch (err) {
                res.status(500).json(err.message)
            }
            
        }
        else {
            res.status(403).json("You just update only your account")
        }
    }
    async deteleUser(req, res, next){
        //delete user
        if(req.params.id === req.user.id || req.user.admin){
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("delete is successful")
            }
            catch (err) {
                res.status(500).json(err.message)
            }
        }
        else {
            res.status(500).json("You just deleted only your account")
        }

        
    }

    async followUser(req, res, next){
        //follow user
        if (req.user.id !== req.params.id){
            try {
                const user = await User.findById(req.params.id)
                const currentUser = await User.findById(req.user.id)
                if (!user.follower.includes(req.user.id)){
                    await user.updateOne({$push:{follower: req.user.id}})
                    await currentUser.updateOne({$push:{flowing: req.params.id},$inc:{followUser : 1}})
                    res.status(200).json('Follow is successful')
                }
                else {  
                    res.status(403).json('You already follow this user')
                }

                
            } catch (err) {
                res.status(500).json(err.message)
            }
        }
        else {
            res.status(403).json("You can't follow yourself")
        }
    }
    async unfollowUser(req, res, next){
        //unfollow user
        if (req.user.id !== req.params.id){
            try {
                const user = await User.findById(req.params.id)
                const currentUser = await User.findById(req.user.id)
                if (user.follower.includes(req.user.id)){
                    await user.updateOne({$pull:{follower: req.user.id}, })
                    await currentUser.updateOne({$pull:{flowing: req.params.id},$inc:{followUser : -1}})
                    res.status(200).json('Unfollow is successful')
                }
                else {
                    res.status(403).json('You dont unfollow this user')
                }

                
            } catch (err) {
                res.status(500).json(err.message)
            }
        }
        else {
            res.status(403).json("You can't unfollow yourself")
        }
    }

    async searchUser(req, res, next){
        //search user
        const query = req.query.q
        try {
            const userSearch = await User.find({username:{$regex:query, $options:'i' }}).limit(10)
            const user = userSearch.map((user) => user)
            res.status(200).json(user)

            
        } catch (err) {
            res.status(500).json(err.message)

        }
    }

}

module.exports = new userController