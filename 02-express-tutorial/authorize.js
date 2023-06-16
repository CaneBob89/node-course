const authorize=(req,res,next)=>{
  const {user}=req.query
  if(user==="cicciogamer"){
    req.user={name:"cicciogamer",id:1}
  next()
  }else{
    res.status(401).send("User not found")
  }
  
}
module.exports=authorize