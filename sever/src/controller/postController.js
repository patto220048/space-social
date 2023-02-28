const Post = require('../model/postModel')
const User = require('../model/userModel')

class PostController {
    //create
    async createPost(req, res, next) {
        const post = req.body
        const newPost = new Post({...post, userId:req.user.id})
        const user = await User.findById(req.user.id)
        try{
            await newPost.save()
            await user.updateOne({$inc:{postCount : 1}})
            res.status(200).json(newPost)   
        }
        catch (err){
            res.status(500).json("CAN'T CREATE POST SEVER IS ERROR", err)
        }


    }
    //get all
    async findPost(req,res,next){

        try {
            const getAllPost = await Post.aggregate([{$sample:{size: 40}}])
            res.status(200).json(getAllPost)
            
        } catch (err) {
            res.status(500).json("CAN'T GET POST SEVER IS ERROR", err)
            
        }

    }
    //get one
    async findOne(req,res,next){

        try {
            const getOnePost = await Post.findById(req.params.id)
            res.status(200).json(getOnePost)

        } catch (err) {
            res.status(500).json("CAN'T GET 1 POST SEVER IS ERROR", err)
            
        }

    }
    //update post
    async updatePost(req, res, next){
        try {
            const post =  await Post.findById(req.params.id)
            if(!post) return res.status(403).json("Post not found")
            else{
                if(req.user.id === post.userId || req.user.admin)
                {
                    const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body,
                    },{
                        new:true
                    })
                    return res.status(200).json(updatePost)
                }
                else {
                    return res.status(401).json('You just update only your post')
                }
            }

        } catch (err) {
            res.status(500).json("CAN'T UPDATE POST SEVER IS ERROR", err)
            
        }
    }
    //delete post
    async deletePost(req, res, next){
        const user = await User.findById(req.user.id)

        const post = await Post.findById(req.params.id)
        try {
            if(!post) return res.status(403).json("Post not found")
            else{
                if( req.user.id === post.userId || req.user.admin)
                {
                    await user.updateOne({$inc:{postCount : -1}})
                    await Post.findByIdAndDelete(req.params.id)
                    return res.status(200).json('Detele is complete')
                }   
                else {
                    return res.status(401).json('You just detele only your post')
                }
            }

        } catch (err) {
            res.status(500).json("CAN'T DELETE POST SEVER IS ERROR", err)
            
        }
    }
    //like post
    async likePost(req, res, next){
        const postId = req.query.q
        try {
            const post =  await Post.findById(postId)
            if(!post.like.includes(req.user.id)){   
                await post.updateOne({$push:{like: req.user.id},$inc:{likes: 1}})
                res.status(200).json('like')

            }
        } catch (err) {
            res.status(500).json("CAN'T LIKE POST SEVER IS ERROR", err)
            
        }

    }
    // dislike
    async dislikePost(req, res, next){
        const postId = req.query.q
        try {
            const post =  await Post.findById(postId)
            if(post.like.includes(req.user.id)){   
                await post.updateOne({$pull:{like: req.user.id},$inc:{likes: -1}})
                res.status(200).json('Dislike')

            }
          
        } catch (err) {
            res.status(500).json("CAN'T DiLIKE POST SEVER IS ERROR", err)
            
        }

    }
    // new post
    async newPost(req, res, next){

        try {
            const post = await Post.find().sort({
                createdAt : -1
            })
            res.status(200).json(post)
        } catch (err) {
            res.status(500).json("CAN'T GET NEW POST SEVER IS ERROR", err)
            
        }

    }

    // get post from followed
    async followedPost(req, res, next){
        try {
            const curentUser = await User.findById(req.user.id)
            const follwingUser = curentUser.flowing        
            const list = await Promise.all(follwingUser.map(postId=>{
                return Post.find({userId:postId})
                }))
            res.status(200).json(list.flat(Infinity).sort((a,b)=>b.createdAt - a.createdAt))
          
            
        } catch (err) {
            res.status(500).json("CAN'T GET FOWLLOED POST SEVER IS ERROR", err)
            
        }

    }
    //get user all post
    async myPost(req, res, next) {
        try {           
            const myPost = await Post.find({userId: req.params.id}).sort({
                createdAt : -1
            })
            res.status(200).json(myPost)
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }

    }
    

}

module.exports = new PostController
