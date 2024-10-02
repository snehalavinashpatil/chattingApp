const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");

//find user by email
requestRouter.get("/User",async (req,res)=>{
    const email = req.body.emailId;
    try{
     const userData =   await  User.find({emailId:email});
     res.send(userData);
    }catch(err){
       err.status(400).send("something went wrong");
    }
   
});



requestRouter.patch("/user/:userId",async (req,res) =>{
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES = ["company","photoUrl","about","skills"];

    const isUpdateAllowed = Object.keys(data).every((item)=>{
        ALLOWED_UPDATES.includes(item);
    });

    if(!isUpdateAllowed){
        res.send(400).send("update not allowed");
    }

    try {
      const user = await User.findByIdAndUpdate({id:userId},data,{
        returnDocument:"after",
        runValidators:true
      });
      res.send("User Updated Successfuly");
    }catch(err) {
      res.send(400).send("Update failed"+err.message);
    }
});

module.exports = requestRouter;