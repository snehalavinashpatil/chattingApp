const express = require("express");
const userRouter = express.Router();

const {userAuthentication} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

//get pending connection request from loggin user
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

//get connections of loggedin user
userRouter.get("/user/connections",userAuthentication,async (req,res)=>{
    try{
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" }
        ]
      });
    const data = connectionRequest.map((row) => row.fromUserId);

    res.json({message:"data fetched successfuly",data});
    }catch(err){
        req.status(400).send("Err"+err.message);
    }
    });

module.exports = userRouter;