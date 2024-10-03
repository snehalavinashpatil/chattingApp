const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const {userAuthentication} = require("../middleware/auth");

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

requestRouter.post("/request/send/:status/:toUserId",userAuthentication,async (req,res)=>{
try{
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  //interested or ignored
  const allowedStatus = ["interested","ignored"];
  if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"invalid status"+status});
  }

  //check if their is existing/pending connection request in schema 
  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
  });

  if(existingConnectionRequest){
    return res.status(400).send("connection request already exists");
  }

  //check if use id is invalid
  const toUser = await User.findById(toUserId);
  console.log(toUser,'toUser');
  if(!toUser){
    res.status(404).json({message:"user not found"+status});
  }

  const request = new ConnectionRequest({fromUserId,toUserId,status});

  const data = await request.save();

  res.json({
    message:"request sent successfully",data
  });
 // res.send("User Updated Successfuly");
}catch(err){
  res.status(400).send("request failed"+err.message);
}
})

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuthentication,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      console.log(requestId,'requestId',status);

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;