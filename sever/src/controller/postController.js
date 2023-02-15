const Post = require('../model/postModel')

class PostController {

    async creatPost(req, res, next) {
        try{
            const post = req.body
            const newPost = new Post(post)

            newPost.save()

            res.status(200).json(newPost)
        }
        catch (err){
            res.status(500).json("server error", err)
        }


    }
    

}

module.exports = new PostController
