const express = require("express");
const userRouter = express.Router();

const {userAuthentication} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request",userAuthentication,async (req,res)=>{
try{
const loggedInUser = req.user;
const connectionRequest = await ConnectionRequest.find({
    toUserId:loggedInUser._id
});
res.json({message:"data sent successfuly",data:connectionRequest});
}catch(err){
    req.status(400).send("Err"+err.message);
}
});

module.exports = userRouter;