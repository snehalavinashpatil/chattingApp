var jwt = require('jsonwebtoken');
const User = require("../models/user");
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser()); // Use cookie-parser middleware

// const adminAuth = (req,res,next)=> {
//     console.log("admin auth getting checked");
//     const token ="xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("not authorized request")
//     }else{
//         req.next();
//     }
// }

const userAuthentication = async (req,res,next)=> {
    try{
        console.log('Cookies:', req.cookies);

        const token = req.cookies.token;
    //validate token
   // console.log(token,'token');
    //console.log(req.cookies, 'Cookies from client');
    //console.log(req.headers.cookie, 'Raw cookie header',res.cookie);
    
    if(!token){
        return res.status(401).send("Please Login!");
    }
    const decodedObj = await jwt.verify(token,"snehal@1994");
    const {_id} = decodedObj;
    const user =await User.findById(_id);
    //find user

    if(!user){
        throw new Error("User not found");
    }
    req.user = user;
    next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    //read token from req
 
}


module.exports = {userAuthentication};