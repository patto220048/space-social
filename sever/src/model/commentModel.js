const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new  Schema({
    
    userId:{
          type:String,
          require:true
    },
    postId:{
          type:String,
          require:true
    },
    comment:{
          type:String,
          require:true
    },
    reply:{
          type:String,
    }
    
    
   
    
    
},{timestamps: true})



module.exports = mongoose.model('comment', Comment )
