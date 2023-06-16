
const{BadRequest}=require("../errors/index")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const login=async(req,res)=>{


//mongoose validations
//joi
//check in the controller
// ``

const {username,password}=req.body

if(!username||!password){
  throw new BadRequest("Please provide username and password!")
}
const id =new Date().getDate()
const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"30d"})
  res.status(200).json({msg:"User created!",token})
}
const dashboard=async(req,res)=>{
  const lucky=Math.floor(Math.random()*100)
  console.log(req.user);
  res.status(200).json({msg:`Hey ${req.user.username}!`,secret:`Your lucky number is ${lucky}!`})

}

  

module.exports={login,dashboard}