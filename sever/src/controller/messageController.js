const Post = require('../model/postModel')
const User = require('../model/userModel')
const Message = require('../model/messageModel')

class MessageController{
    //create message
    async create(req, res, next){
        const newMessage = new Message(req.body)

        try {
            const savedMessage = await newMessage.save()
            res.status(200).json(savedMessage)
        } catch (err) {
            res.status(500).json(err.message)
            
        }
    }
    async getMessage(req, res, next){
        try {
            const message = await Message.find({
                conversationId : req.params.conversationId
            })
            res.status(200).json(message)
        } catch (err) {
            res.status(500).json(err.message)   
        }


    }




}



module.exports = new MessageController
