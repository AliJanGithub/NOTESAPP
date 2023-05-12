const mongoose=require("mongoose");
const {Schema}=mongoose;
const Notesschema=new Schema({
    user:{
        //if we want ke not es private rahen or user login wala hi dekhe
     type:mongoose.Schema.Types.ObjectId,
     ref:'user'
     },
    tittle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag :{
        type:String,
       default:"General"
},
    date:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model('notes',Notesschema)