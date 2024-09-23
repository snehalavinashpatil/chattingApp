const express = require("express");
const {adminAuth} = require("./middleware/auth");
const app = express();

app.use("admin",adminAuth);

app.use("/admin",(req,res)=>{
    res.send("hello from server !");
});

app.use("/admin/home",(req,res)=>{
    res.send("welcome home from server again!");
});

app.listen(3000,()=>{
    console.log("server started successfully");
});