const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
    },
    lname:{
        type:String
    },
    emailId:{
        type:String,
        require:true,
        unique:true,
        lowerCase:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Error: "+value);
                
            }
        }
    },
    password:{
        type:String,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong");
                
            }
        }
    },
    age:{
        type:Number,
    },
    company:{
        type:String
    },
    gender:{
        type:String,validate(value){
            if(!["Male","Femal"].includes(value)){
                throw new Error ("Gender Not Available !!!");
            }
        }
    },
    photoUrl:{
        type:String,
        deault:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwUBAgYEB//EADAQAQACAQIFAgQFBAMAAAAAAAABAgMEEQUSITFBE1FhcYHBIjNSkdFCU2KxFSMy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATMVrNpnaI7zPh4M/FMVJ2xR6k/q7QD3ikvxTUzP4Yx1+m7T/AJLV/wBys/CagvhT4+LZa/m46Xj4dJWGm1uDUbRS0xaf6bdwegAAAAAAAAAAAAAAABpmy0w45yZJ2rDdQ8T1U6jPNazPpU6Vj395BprNZk1V9p/DjielI+7z7ddzYAAAO3n9gBacP4jMzGLUTvM9Iv8AytXLbLvhWq9bF6d7b5Ke/mAe4AAAAAAAAAAAAAHn1+WcOkyXjv2j5y56Oy443bbBjj3t9lOAAAAAAAn0WX0dZiv435bfJAT7+wOpGKTzUrb3iJZAAAAAABpS3iW6BvW+3QEgxExLIAAK7jcb4MU+It9lPHZ0HEcU5tHkiP8A1HWPo5+AAAAAAACf9ifRYpzavHXvHNEz8o6g6HHHLjpWe8ViGQAAAN2LWiqO1twbTk69BGAAAzE7N65PFuyMBPAhidm0X94BJKg4jpp0+eeX8u3Ws+3wX0Xifg0z4aajDNLxvE9veJ9wc0J9XpcmltteN67/AIb+EAAAAMgxK54TpvSxTlvExkvHTfxCDh3DpvMZdRG1Y61pPn5reZAGs3j3azefAJJmI7tLX8Q0n5sAywAAAAAAAAItTqcWnpve3We1Y7yCXz3QZtbgwzMTk3t+mvVU6jXZs+9d+SntX7y83gFnm4tzRNa4YtWe8XlXWvzWmeWKxPiPDUBnmOZgBnmTabUzp7c0YqXnxNu8IAFxj4vSfza2r8Y6vXizY81ebHki3ylzjNbTW0WrO1o7TAOlFXpeJ2iYrqeseLxHX6rOtotEWrMTE9pjrAMgAAAAAAAAi1Weunwze3f+mPeQRa3WRpq7RtOSe0e3xlS5L2yX58lua8+TJktlyWvkne1p3mWoAAAAAAAAAAD0aPV30ttu+PzWPs84DpMd65KRfHbmrPaWyk4fqp0+TltP/Xeev+M+67AAAAAAAUnEs/raiaxO9KdI/la6zL6OmveJ67bV+bn46AAAAAAAAAAAAAAALnheonLh5LTvfH0+nhTPRoMvo6ulvE/hn6gvgAAAAAV/GZmMOOPE36/sqQAAAAAAAAAAAAAAAJ7TMADpcc71rM+axLIAAA//2Q=="
    },
    about:{
        type:String,
        default:"This is default info"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});

module.exports = mongoose.model('user',userSchema);