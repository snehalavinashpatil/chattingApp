const adminAuth = (req,res,next)=> {
    console.log("admin auth getting checked");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("not authorized request")
    }else{
        req.next();
    }
}

module.exports = {adminAuth};