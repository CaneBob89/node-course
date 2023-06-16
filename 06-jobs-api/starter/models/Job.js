const mongoose=require("mongoose")
const JobSchema=new mongoose.Schema({
company:{
  type:String,
  trim:true,
  required:[true,"Please provide a company name"],
  maxlength:50
},
position:{
  type:String,
  trim:true,
  required:[true,"Please provide a position"],
  maxlength:100
},
status:{
  type:String,
    enum:["interview","decline","pending"],
    default:"pending"
},
createdBy:{
 type:mongoose.Types.ObjectId,
 ref:"User",
  required:[true,"Must require a user"]
}
},
{timestamps:true})
module.exports=mongoose.model("Job",JobSchema)