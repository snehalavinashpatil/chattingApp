const express = require("express");
const connectDB = require('./config/database');
//const {adminAuth} = require("./middleware/auth");
const app = express();

// app.use("admin",adminAuth);

// app.use("/admin",(req,res)=>{
//     res.send("hello from server !");
// });

// app.use("/admin/home",(req,res)=>{
//     res.send("welcome home from server again!");
// });

app.use(express.json());

const User = require("./models/user");
app.post('/signup',async (req,res)=>{
    console.log(req,'req');
    // const userObj = {
    //     fname:"cheta",
    //     lname:'patil',
    //     emailId:'cheta@gmail.com',
    //     password:'ABC',
    //     age:33,
    //     componey:'Welspun',
    //     gender:'Male'
    // };

    try {
        const user = new User(req.body);
        await user.save();
        res.send("user added successfuly");
    }catch(err){
       res.status(400).send("Bad request");
    }

});

connectDB().then(()=>{
    app.listen(3000,()=>{
        console.log("server started successfully");
    });
    console.log("database connection established");
}).catch((err) =>{
    console.log("error occured");
});