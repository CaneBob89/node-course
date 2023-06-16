const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const UserSchema=new mongoose.Schema({
name:{
  type:String,
  required:[true,"Must require a name!"],
  trim:true,
  minlength:[3,"Name can't be shorter than 3 characters!"],
  maxlength:[50,"Name can't be longer than 50 characters!"],
},
email:{
  type:String,
  required:[true,"Must require an E-Mail!"],
  trim:true,
  match:[
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide valid E-Mail"
  ],
  unique:true,
},
password:{
  type:String,
  required:[true,"Must require a password!"],
  trim:true,
  minlength:[3,"Password can't be shorter than 3 characters!"]
}
})
UserSchema.pre("save",async function(){
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})
UserSchema.methods.createJWT=function(){
  return jwt.sign({userID:this._id,name:this.name},
  process.env.JWT_SECRET,
  {expiresIn:process.env.JWT_LIFETIME}  )
}
UserSchema.methods.comparePassword=async function(passwordToCompare){
  const compared=await bcrypt.compare(passwordToCompare,this.password)
  return compared
}
module.exports=mongoose.model("User",UserSchema)
