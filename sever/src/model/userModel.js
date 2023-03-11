

const { text } = require('express');
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
    username : {
        required: true,
        unique: true,
        type: String,
        maxlength: 50
    },
    decs:{
        type: String,
        maxlength: 100
    },
    region:{
        type: String,
        maxlength: 50
    },
    age: {
        type: String,
    }
    ,
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
    follower :{
        type: Array,
        default: [],
    },
    flowing:{
        type: Array,
        default: [],    
    },
 
    followUser:{
        type:Number,
        default: 0,
    }
    ,
    fromGoogle:{
        type:Boolean,
        default: false

    },
    emailVerified :{
        type:Boolean,
        default: false
    }
    ,
    postCount:{
        type:Number,
        default: 0
    }
    ,
    descProfile: {
        type:String

    },
    friend : {
        type:Array,
        default:[]
    },
    pendding : {
        type:Array,
        default:[]
    },

    waitting:{
        type:Array,
        default:[]
    }

    




    
    
},{timestamps: true})



module.exports = mongoose.model('users', User )




