const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const {userAuthentication} = require("../middleware/auth");
const {validateProfileData} = require("../utils/validation");
const ConnectionRequest = require("../models/connectionRequest");
const mongoose = require("mongoose");

profileRouter.get("/profile/view",userAuthentication,async (req,res)=>{
    console.log("profile");
    try {
       const user =await req.user;
       console.log(user,"user profile");
    if(!user){
        throw new Error ("Invalid User");
    }
    
        res.send(user);
    
    }catch(err){
        res.status(400).send(err.message);
    } 
});

profileRouter.patch("/profile/edit",userAuthentication,async (req,res)=>{
    try {
        if (!validateProfileData(req)) {
          throw new Error("Invalid Edit Request");
        }
    
        const loggedInUser = req.user;
    
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    
        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.fname}, your profile updated successfuly`,
          data: loggedInUser,
        });
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
});

profileRouter.get("/feed",userAuthentication,async (req,res)=>{
   // console.log(req,'req');
        try{
            const users =   await  User.find({});
            res.send(users);
            //console.log(User);
           }catch(err){
              res.status(400).json({message:err.message});
           }
    });

    //show profiles of people not connected yet and his own card
profileRouter.get("/profiles",userAuthentication,async (req,res)=>{
          try{
            //user sees all cards except his own and his connection
            //people who has igored or already sent coneection request to
            const loggedInUser = req.user;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip=(page-1)*limit;

              //find all send+received connection request
              const connectionRequest = await ConnectionRequest.find({
                $or: [
                  { fromUserId: loggedInUser._id },
                  { toUserId: loggedInUser._id }
                ]
            }).select("fromUserId toUserId")
            .populate("fromUserId", "fname")
            .populate("toUserId", "fname");
            //console.log(connectionRequest,'connectionRequest');

            const hideUsers = new Set();
            connectionRequest.forEach((req)=>{
              hideUsers.add(req.fromUserId.toString());
              hideUsers.add(req.toUserId.toString());
            });

             // Ensure hideUsers is an array of valid ObjectIds
  const hideUsersArray = Array.isArray(hideUsers) ? hideUsers : Array.from(hideUsers);

              // Extract _id from objects and validate as ObjectId
  const validHideUsers = hideUsersArray
  .map((user) => (typeof user === "object" && user._id ? user._id : user)) // Extract _id if object
  .filter((id) => mongoose.Types.ObjectId.isValid(id)); // Validate as ObjectId

            
            const usersList = await User.find({
              $and:[
                {_id:{$nin:validHideUsers}},
                {_id:{$ne:loggedInUser._id}}
              ]
            }).skip(skip).limit(limit);

              res.send(usersList);
             }catch(err){
                res.status(400).json({message:err.message});
             }
      });
    
    module.exports = profileRouter;