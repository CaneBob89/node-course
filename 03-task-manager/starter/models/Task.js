const mongoose=require("mongoose")
const NewTask=new mongoose.Schema({
  name:{ 
type:String,
required:[true,"Must provide a name"],
trim:true,
maxlength:[30,"Name can't be longer than 30 characters"],
minlength:[4,"Name can't be shorter than 4 characters"]
  },
  completed:{
type:Boolean,
default:false
  }
})
module.exports=mongoose.model("Task",NewTask)