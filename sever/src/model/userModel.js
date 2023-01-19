

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new  Schema({
    email :{
        type: String,
        required: true,
        lowcase: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    fullName : {
        type: String,
    },
    region:{
        type: String,
    },
    age: {
        type: Number,
    }
    ,
    liked : {
        type: Array,
        default : [],
    }
    ,likedUser : {
        type: Array,
        default : [],
    },
    friend:{
        type: Array,
        default : [],
    },
    friendUser: {
        type: Array,
        default : [],
    },
    admin:{
        type:Boolean,
        default: false,
    },
    userImg:{
        type: String,
    },
    userCoverImg:{
        type: String,
    },
    flower :{
        type: Array,
        default: [],
    },
    flowerUser:{
        type: Array,
        default: [],
    }


    
    
},{timestamps: true})



module.exports = mongoose.model('users', User )




