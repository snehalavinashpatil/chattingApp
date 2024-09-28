const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    company:{
        type:String
    },
    gender:{
        type:String
    }
});

module.exports = mongoose.model('user',userSchema);