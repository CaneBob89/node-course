const express=require("express")
const router=express.Router()

router.post("/",(req,res)=>{
  const {name}=req.body
  if(name){
    return res.status(200).send(name)
  }
  res.status(401).send("Please provide a name")
  console.log(name)
  })
module.exports=router