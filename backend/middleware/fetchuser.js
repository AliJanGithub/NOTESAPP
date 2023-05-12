const jwt=require('jsonwebtoken')
const JWT_SECRET='heisnotagoodb@oy'
const fetchusers=(req,res,next)=>{
   const token=req.header('auth-token');
   if(!token){
    res.status(401).send({error:"token is invalid"})
   }
   try {
    const data=jwt.verify(token,JWT_SECRET)
   req.user=data.user
    next();
   } catch (error) {
    res.status(401).send({error:'error'})
   }
   
}
module.exports=fetchusers;