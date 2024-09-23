const mongoose = require("mongoose");

//returns promise
const coonectDB = async ()=> {
    await mongoose.connect("mongodb+srv://snehalohio:<D5pQVy9VaZqFe2Ff>@cluster0.gci99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

coonectDB().then(()=>{
    console.log("database connection established");
}).catch(err =>{
    console.log("error occured");
});