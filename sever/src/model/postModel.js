const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new  Schema({
    
    userId:{
        type:String,

    },
   title:{
    type:String,
    maxlength : 100,
    require: true,
   },
   desc:{
    type:String,
    maxlength : 1000,
    require: true,
   },
   imgPost:{
    type:String,
   },
   tag:{
    type:String,
   }



    
    
},{timestamps: true})



module.exports = mongoose.model('post', Post )
