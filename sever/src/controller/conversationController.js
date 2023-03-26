const Post = require('../model/postModel')
const User = require('../model/userModel')
const Conversation = require('../model/conversationModel')

class ConversationController{
    //create commnet
    async create(req, res, next){
        const newConversation = new Conversation({
            members:[req.body.senderId, req.body.receiverId]
        })
        try {
            const savedConver =   await newConversation.save()
            res.status(200).json(savedConver)
        } catch (err) {
            res.status(500).json(err.message)   
            
        }
    }
    async getConversation(req, res, next){
        try {
            const conversation = await Conversation.find({
                members:{$in:[req.params.userId]}
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err.message)
            
        }
      
    }

}



module.exports = new ConversationController
