const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new  Schema({
    
    type:{
      type:String,
      require:true
    },
    senderId:{
      type:String,
      require:true

    },
    receiverId:{
      type:String,
      require:true

    },
    senderName:{
      type:String,
      require:true

    },
    senderImg:{
      type:String,
      require:true

    }
    
   
    
    
},{timestamps: true})



module.exports = mongoose.model('Notification', Notification )
