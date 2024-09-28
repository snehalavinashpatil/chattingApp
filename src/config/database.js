const mongoose = require("mongoose");

//returns promise
const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://snehalohio:D5pQVy9VaZqFe2Ff@cluster0.gci99.mongodb.net/chattingApp");
}

module.exports = connectDB;