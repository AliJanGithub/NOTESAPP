const mongoose=require('mongoose');
const {Schema}=mongoose;
const  Userschema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
})
const User=mongoose.model('user',Userschema);
User.createIndexes();
module.exports=User;
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass