const User=require("../models/User")
const {StatusCodes}=require("http-status-codes")
const CustomError=require("../errors")
const{createJWT,
  attachCookieToResponse
}=require("../utils")

const register=async(req,res)=>{
  const {email,name,password}=req.body
  const already=await User.findOne({email})
  if(already){
    throw new CustomError.BadRequestError("You must choose another E-Mail!")
  }
// firstRegisteredUser=>Admin
const isFirstAccount=await User.countDocuments({})===0
const role=isFirstAccount?"admin":"user"

  const user=await User.create({email,name,password,role})
const tokenUser={userId:user._id,name:user.name,role:user.role}
  attachCookieToResponse({
    res,
    user:tokenUser
  })

  // res.status(StatusCodes.CREATED).json({user:tokenUser})
  
}
const login=async(req,res)=>{
  res.send("login")
}
const logout=async(req,res)=>{
  res.send("logout")
}
module.exports={
  register,
  login,
  logout
}