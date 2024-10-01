const express = require("express");
const connectDB = require('./config/database');
const bcrypt = require('bcrypt');
//const {adminAuth} = require("./middleware/auth");
const {validateSignUpData} = require('./utils/validation');
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
    //validate
    validateSignUpData(req);

   

    const {fname,lname,password,emailId,age,componey,gender} = req.body;
    //encript
   const encriptedPassword = await bcrypt.hash(password,10);

    
    // const userObj = {
    //     fname:"cheta palli",
    //     lname:'patil rao',
    //     emailId:'chetapalli@gmail.com',
    //     password:'ABCxyz123!@#',
    //     age:33,
    //     componey:'Welspun',
    //     gender:'Male'
    // };

   try {
        const user = new User({
            fname,lname,password:encriptedPassword,emailId,age,componey,gender
        });
       // const user = new User(userObj);
        console.log(user,'user saved');
        await user.save();
        res.send("user added successfuly");
    }catch(err){
       res.status(400).send("Bad request");
    }

});

app.post("/login",async (req,res)=>{
try {
const {emailId,password} = req.body;
if(validateSignUpData(email)){
    const user = User.findOne({emailId:emailId});
    if(!user){
        throw new Error ("EMail not present");
    }
    const isValid = await bcrypt.compare("password",user.password);
    if(isValid){
        res.send("Login successful");
    }else{
        throw new Error ("Password is not correct !");
    }
}
}catch(err){
    err.status(400).send("something went wrong");
}
});

//find user by email
app.get("/User",async (req,res)=>{
    const email = req.body.emailId;
    try{
     const userData =   await  User.find({emailId:email});
     res.send(userData);
    }catch(err){
       err.status(400).send("something went wrong");
    }
   
});

app.get("/feed",async (req,res)=>{
    
    try{
        const userData =   await  User.find({});
        res.send(userData);
       }catch(err){
          err.status(400).send("something went wrong");
       }
});

app.patch("/user/:userId",async (req,res) =>{
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

connectDB().then(()=>{
    app.listen(3000,()=>{
        console.log("server started successfully");
    });
    //console.log("database connection established");
}).catch((err) =>{
    console.log("error occured");
});