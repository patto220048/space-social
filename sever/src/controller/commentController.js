const Post = require('../model/postModel')
const User = require('../model/userModel')
const Comment = require('../model/commentModel')

class CommentController{

    async createComment(req, res, next){

        const newComment = await Comment({userId: req.user.id, ...req.body})

        try {
            const savedComment = await newComment.save()
            res.status(200).json(savedComment)     

        } catch (err) {
            res.status(500).json(err.message)
            
        }


    }


}



module.exports = new CommentController
