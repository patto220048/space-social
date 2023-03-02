const Post = require('../model/postModel')
const User = require('../model/userModel')
const Notification = require('../model/notificationModel')

class NotificationController{
    //create commnet
    async createNotifi(req, res, next){
        const newNoti = await Notification({...req.body})
        try {
            const savedNoti = await newNoti.save()
            res.status(200).json(savedNoti)     
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }


    }
    async getNotifi(req, res, next){
        
        try {
            const notifi = await Notification.find()
            res.status(200).json(notifi)     
            
            
        } catch (err) {
            res.status(500).json(err.message)
            
        }


    }

    




}



module.exports = new NotificationController
