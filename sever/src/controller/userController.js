const User = require('../model/userModel')



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
        if(req.params.id == req.user.id || req.user.admin ){
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
    }
    async deteleUser(req, res, next){
        if(req.params.id == req.user.id || req.user.admin){
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("delete is successful")
            }
            catch (err) {
                res.status(500).json("You just deleted only your account")
            }
        }
        
    }


}

module.exports = new userController