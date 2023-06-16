const {BadRequestError}=require("../errors")

const testUser=(req,res,next)=>{
  if(req.user.testUser){
    throw new BadRequestError("You are with the test user! You can only read!")
  }
  next()
}
module.exports=testUser