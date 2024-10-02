const express = require("express");
const profileRouter = express.Router();
const {userAuthentication} = require("../middleware/auth");

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
        if (!validateEditProfileData(req)) {
          throw new Error("Invalid Edit Request");
        }
    
        const loggedInUser = req.user;
    
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    
        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        });
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
});

    profileRouter.get("/feed",async (req,res)=>{
    
        try{
            const userData =   await  User.find({});
            res.send(userData);
           }catch(err){
              err.status(400).send("something went wrong");
           }
    });
    
    module.exports = profileRouter;