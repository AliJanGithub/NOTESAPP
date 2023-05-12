// const mongoose=require('mongoose')
// const mongoURI='mongodb://localhost:27017'
// const connecttodb=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("success")
//     })
        
    
// }
const mongoose = require('mongoose');
const connecttodb=mongoose.connect('mongodb://localhost:27017/inotebook', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.error(error);
  });
  module.exports=connecttodb;
