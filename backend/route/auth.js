const express=require('express')
const { body, validationResult } = require('express-validator');//1
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const router=express.Router();
const User=require('../schema/User')
const JWT_SECRET='heisnotagoodb@oy'
const fetchusers=require("../middleware/fetchuser")



//Route 1 signup
router.post('/signup',[
  body('name','enter valid 5 charavters name').isLength({ min: 5 }),
  body('email','invalid email').isEmail(),
 body('password','invalid password').isLength({min:5}),
], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  //  const user=User(req.body);
  //  user.save();
  //  res.send(req.body); 
  try {
    
 
  let user= await User.findOne({email:req.body.email})
  if(user){
    return res.status(400).json({error:"already exist email"})
  }

  const salt= await bcrypt.genSalt(10)
  const secpass= await bcrypt.hash(req.body.password,salt)
  user= await User.create({
    name: req.body.name,
    email: req.body.email,
    password:secpass,
  })
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET)
  // console.log(jwtData)
     res.json({authtoken}) 
    } catch (error) {
    console.log(error.message)
    res.status(500).send("some internal error occured")
    }
  })
  // Route 2login form submission with user email and password

  router.post("/login",[
  body('email','invalid email').isEmail(),
  body('password','invalid password').exists(),
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password}=req.body;
    


  
  try {
    const user=await User.findOne({email})
    if(!user){
    return  res.status(400).json({error:"use authenticated credentials"})
    }
const comaprepassword=await bcrypt.compare(password,user.password);
if(!comaprepassword){ 
  return res.status(400).json({msg:'log with correct credentials'})
}
const data={
  user:{
    id:user.id,
  },
}
const authtoken=jwt.sign(data,JWT_SECRET)
// console.log(jwtData)
   res.json({authtoken}) 
  } catch (error) {
    console.log("garbar he")
    res.status(500).send("Some internal error occurred");
  }
})



//Route 3 Get user info
router.post("/getinfo",fetchusers,async (req,res)=>{
  try {
     userid=req.user.id
     const user= await  User.findById(userid).select("-password")
    res.send(user)
   } catch (error) {
      console.log("garbar he")
      res.status(500).send("Some internal error occurred");
    }
})
// module.exports=User;
module.exports=router; 