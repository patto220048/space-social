const Post = require('../model/postModel')
const User = require('../model/userModel')
const Comment = require('../model/commentModel')

class CommentController{
    //create commnet
    async createComment(req, res, next){
        const postId = req.body.postId
        const newComment = await Comment({userId: req.user.id, postId, ...req.body})

        const post = await Post.findById( postId )
        console.log(post)
        try {
            const savedComment = await newComment.save()
            await post.updateOne({$inc:{commentCount : 1}})
            res.status(200).json(savedComment)     
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }


    }
    //get comments
    async getComment(req, res, next) {
        try {

            const comments = await Comment.find({postId : req.params.postId}).sort({_id:1})
            res.status(200).json(comments)
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }

    }
    //delete comment
    async deleteComment(req, res, next) {

        try {
            
            const comment = await Comment.findById(req.params.idCmt)
            const postid = comment.postId
            const post = await Post.findById( postid )
            if(req.user.id === comment.userId || req.user.admin ){
                await Comment.findByIdAndDelete(req.params.idCmt)
                await post.updateOne({$inc:{commentCount : -1}})

                return res.status(200).json('Comment deleted')
            }
            else {
                return res.status(403).json("You can delete only your comment")    
            }

        } catch (err) {
            res.status(500).json(err.message)
            
        }
    }





}



module.exports = new CommentController
