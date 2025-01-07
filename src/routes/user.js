const express = require("express");
const userRouter = express.Router();

const {userAuthentication} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "fname lname photoUrl age gender about skills";

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

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuthentication, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
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
      }).populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    
      const data = connectionRequest.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      });
  
    res.json({data});
    }catch(err){
        res.status(400).send({ message: err.message });
    }
    });

module.exports = userRouter;