const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new  Schema({
    
    userId:{
        type:String,
        require:true
    },
    title:{
        type:String,
        maxlength : 100,

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
          type:Array,
          default:[],
     },
     like:{
          type:Array,
          default:[]
     },
     likes:{
          type: Number,
          default:0
     }
 
   



    
    
},{timestamps: true})



module.exports = mongoose.model('post', Post )
