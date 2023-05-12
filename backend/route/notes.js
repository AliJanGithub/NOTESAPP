const express=require("express");
const router=express.Router();
const { body, validationResult } = require('express-validator');//1

const Notes=require("../schema/Notes")
const fetchuser=require("../middleware/fetchuser")
router.get("/fetchnotes",fetchuser, async(req,res)=>{
   const note= await Notes.find({user:req.user.id})
   res.json(note)
// res.json([])
})
router.post("/addnote",fetchuser,[
   body('tittle','enter valid tittle').isLength({ min: 5 }),
   body('description','enter valid description').isLength({ min: 5 }),
   body('tag','enter valid tag').isLength({ min: 5 }),
], async(req,res)=>{
   try {
      const {tittle,description,tag}=req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note=new Notes({
         tittle,description,tag,user:req.user.id
      })
      const savednotes =await note.save();
      res.json(savednotes)
   } catch (error) {
      res.status(401).send("notes me problem")
   }
   

})   
 
//update notes   api/notes/update
router.put("/update/:id",fetchuser,async(req,res)=>{
   const {tittle,description,tag}=req.body;
     const newnote={};

     if(tittle){newnote.tittle=tittle}
     if(description){newnote.description=description}
     if(tag){newnote.tag=tag}
let note=await Notes.findById(req.params.id);
if(!note){res.status(401).json({error:"maybe id problem"})};
if(note.user.toString() !== req.user.id){
   res.status(401).json({error:"masail"})

}
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
res.json(note)

})
//delete  notes   api/notes/delete  login req
try {
   router.delete("/delete/:id",fetchuser,async(req,res)=>{
      const {tittle,description,tag}=req.body;
        
   let note=await Notes.findById(req.params.id);
   if(!note){return res.status(401).json({error:"maybe id problem"})};
   if(note.user.toString() !== req.user.id){
      return res.status(401).json({error:"masail"})
   
   }
    note=await Notes.findByIdAndDelete(req.params.id)
   res.json({"success":"deleted",note:note})
   
   
   })
} catch (error) {
   console.log("error delete")
}


module.exports=router;