var validator = require('validator');

const validateSignUpData = (req) =>{
    const {fname,lname,password,emailId} = req.body;

    if(!fname || !lname){
        throw new Error ("Name is not valid !!");
    }else if(emailId && !validator.isEmail(emailId)){
        throw new Error ("Email is not valid!");
    }else if(password && !validator.isStrongPassword(password)){
        throw new Error ("Invalid !!");
    }
}

const validateProfileData = (req) =>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
      ];
    
      const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
      );
    
      return isEditAllowed;
}

module.exports = {validateSignUpData,validateProfileData}