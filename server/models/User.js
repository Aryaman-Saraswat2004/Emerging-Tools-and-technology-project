const mongoose = require('mongoose') ;
const UserSchema = new mongoose.Schema({
    "name" : String, 
    "email" : String , 
    "password" : String ,
    "city" : String ,
    role : {
        type : String , 
        enum : ["USER" , "ADMIN" , "VOLUNTEER"] ,
        default : "USER"
    }
  
})
module.exports = mongoose.model("users" , UserSchema) ; 
