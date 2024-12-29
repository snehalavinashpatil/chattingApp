const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');

const {validateSignUpData} = require('../utils/validation');
const User = require("../models/user");

//var jwt = require('jsonwebtoken');

authRouter.post('/signup',async (req,res)=>{
    // const userObj = {
    //     fname:"cheta palli",
    //     lname:'patil rao',
    //     emailId:'chetapalli@gmail.com',
    //     password:'ABCxyz123!@#',
    //     age:33,
    //     componey:'Welspun',
    //     gender:'Male'
    // };
    
    //console.log(validateSignUpData(req),'validateSignUpData(req)');
   

    const {fname,lname,password,emailId,age,company,gender} = req.body;

   try {
     //validate
   validateSignUpData(req);
    //encript
   const encriptedPassword = await bcrypt.hash(password,10);

        const user = new User({
            fname,lname,password:encriptedPassword,emailId,age,company,gender
        });
        //console.log(user,'user testing');
       // const user = new User(userObj);
       const savedUser = await user.save();
       const token = await savedUser.getJWT();
       // console.log(token,'token');
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
          });
          res.json({ message: "User Added successfully!", data: savedUser });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

});

authRouter.post("/login",async (req,res)=>{
    try {
    const {emailId,password} = req.body;

    const user = await User.findOne({ emailId: emailId });
        
        if(!user){
            //throw new Error ("eMail not present");
            return res.status(401).send('User not loggin..');
        }
        const isValid = await user.validatePassword(password);
        if(isValid){
            
            //create jwt token
            const token = await user.getJWT();
            //add token to cookie and send response back to server
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: true,
                secure: true,
                sameSite: 'None',
              });
            res.send(user);
        }else{
            throw new Error ("Password is not correct !");
        }

    }catch(err){
        res.status(400).send("something went wrong");
    }
});

authRouter.post("/logout",async (req,res)=>{
res.cookie("token",null,{
    expires:new Date(Date.now())
});
res.send("logout successful");
});

module.exports = authRouter;