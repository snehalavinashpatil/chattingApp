const express = require("express");
const app = express();

app.use("/test",(req,res)=>{
    res.send("hello from server !");
});

app.use("/home",(req,res)=>{
    res.send("welcome home from server again!");
});

app.listen(3000,()=>{
    console.log("server started successfully");
});