var jwt = require('jsonwebtoken');
const User = require("../models/user");

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
        const {token} = req.cookies;
 const decodedObj = await jwt.verify(token,"snehal@1994");
    //validate token

    if(!token){
        throw new Error ("Invalid token");
    }

    const {_id} = decodedObj;
    const user =await User.findById(_id);
    //find user

    if(!user){
        throw new Error ("Invalid User");
    }
    req.user = user;
    next();
    }catch(err){
        res.status(400).send(err.message);
    }
    //read token from req
 
}


module.exports = {userAuthentication};