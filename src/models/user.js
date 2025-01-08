const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
    },
    lname:{
        type:String
    },
    emailId:{
        type:String,
        require:true,
        unique:true,//automaticaly creates index for unique:true
        lowerCase:true,
        trim:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Error: "+value);
                
            }
        }
    },
    password:{
        type:String,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong");
                
            }
        }
    },
    age:{
        type:Number,
    },
    company:{
        type:String
    },
    gender:{
        type:String,
        enum: {
            values: ["Male","Femal"],
            message: `{VALUE} Gender Not Available !!!`,
          }
        // ,validate(value){
        //     if(!["Male","Femal"].includes(value)){
        //         throw new Error ("Gender Not Available !!!");
        //     }
        // }
    },
    photoUrl:{
        type:String,
        default: "https://geographyandyou.com/images/user-profile.png",
        },
    about:{
        type:String,
        default:"This is default info"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({ _id:user._id }, process.env.JWT_KEY);
    //console.log(token,'token getJWT');
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
  
    const isPasswordValid = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
    );
  return isPasswordValid;
  };

module.exports = mongoose.model('user',userSchema);